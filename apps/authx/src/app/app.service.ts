import { RegisterRequest } from '@adi/authx-proto';
import { AuthxPrismaService } from '@adi/authx/prisma';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private readonly prisma: AuthxPrismaService) {}

  async register(data: RegisterRequest) {
    await this.prisma.userAuth.create({
      data: {
        email: data.email,
        password: data.password,
        username: '',
        tenant: data.tenant,
      },
    });
  }
}
