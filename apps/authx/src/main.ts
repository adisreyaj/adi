import { AUTH_PACKAGE } from '@adi/authx-proto';
import { AuthxExceptionsFilter } from '@adi/authx/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import * as process from 'process';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: AUTH_PACKAGE,
        protoPath: join(
          process.cwd(),
          'libs/authx/proto/src/lib/auth/auth.proto'
        ),
      },
    }
  );
  app.useGlobalFilters(new AuthxExceptionsFilter());
  await app.listen();
}

bootstrap();
