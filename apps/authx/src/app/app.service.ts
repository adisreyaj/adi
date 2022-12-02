import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from '@adi/authx-proto';
import { AuthxPrismaService } from '@adi/authx/prisma';
import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcryptjs';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(
    private readonly prisma: AuthxPrismaService,
    private readonly jwt: JwtService
  ) {}

  async register(data: RegisterRequest): Promise<RegisterResponse> {
    const user = await this.prisma.userAuth.create({
      data: {
        email: data.email,
        password: data.password,
        username: '',
        tenant: data.tenant,
      },
    });

    return {
      status: 200,
      token: this.generateToken(user.id, user.email, user.tenant),
      user: {
        id: user.id,
        email: user.email,
        tenant: user.tenant,
      },
      error: [],
    };
  }

  async login(data: LoginRequest): Promise<LoginResponse> {
    this.logger.log('Logging in user', { email: data.email });
    const user = await this.prisma.userAuth.findUniqueOrThrow({
      where: {
        tenant_email: {
          tenant: data.tenant,
          email: data.email,
        },
      },
    });
    const isPasswordValid = compareSync(data.password, user.password);
    if (!isPasswordValid) {
      this.logger.log('Invalid password', { email: data.email });
      throw new ForbiddenException('Invalid password');
    }
    return {
      status: 200,
      token: this.generateToken(user.id, user.email, user.tenant),
      user: {
        id: user.id,
        email: user.email,
        tenant: user.tenant,
      },
      error: [],
    };
  }

  private generateToken(userId: string, email: string, tenant: string): string {
    return this.jwt.sign(
      { id: userId, email: email },
      {
        issuer: tenant,
      }
    );
  }
}
