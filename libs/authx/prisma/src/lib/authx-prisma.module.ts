import { Module } from '@nestjs/common';
import { AuthxPrismaService } from './authx-prisma.service';

@Module({
  providers: [AuthxPrismaService],
  exports: [AuthxPrismaService],
})
export class AuthxPrismaModule {}
