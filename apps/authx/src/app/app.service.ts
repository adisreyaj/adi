import { AuthxPrismaService } from '@adi/authx/prisma';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private readonly prisma: AuthxPrismaService) {}

  async register(email: string, password: string) {
    await this.prisma.userAuth.create({
      data: {
        email: email,
        password: password,
        username: '',
      },
    });
  }
}
