import { AUTH_SERVICE, AuthServiceClient } from '@adi/authx-proto';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class AppService implements OnModuleInit {
  private authService: AuthServiceClient;

  constructor(@Inject(AUTH_SERVICE) private client: ClientGrpc) {}

  onModuleInit() {
    this.authService = this.client.getService<AuthServiceClient>(AUTH_SERVICE);
  }

  register() {
    return this.authService.register({
      email: 'hi@adi.so',
      password: 'password',
    });
  }
}
