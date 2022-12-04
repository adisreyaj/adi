import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { genSaltSync, hashSync } from 'bcryptjs';
import { PrismaClient } from './prisma';

@Injectable()
export class AuthxPrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
    this.setupPasswordHashMiddleware();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }

  private setupPasswordHashMiddleware() {
    this.$use(async (params, next) => {
      if (params.model == 'UserAuth') {
        if (params.action == 'create') {
          params.args.data.password = this.hashPassword(
            params.args.data.password
          );
        }
      }
      return next(params);
    });
  }

  private hashPassword(password: string): string {
    const salt: string = genSaltSync(10);

    return hashSync(password, salt);
  }
}
