import { AuthxPrismaModule } from '@adi/authx/prisma';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    AuthxPrismaModule,
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => {
        return {
          privateKey: config.get('JWT_PRIVATE_KEY'),
          publicKey: config.get('JWT_PUBLIC_KEY'),
        };
      },
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
