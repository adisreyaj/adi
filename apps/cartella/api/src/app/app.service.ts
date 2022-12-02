import {
  AUTH_SERVICE,
  AuthServiceClient,
  LoginRequest,
  RegisterRequest,
} from '@adi/authx-proto';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { environment } from '../environments/environment';

@Injectable()
export class AppService implements OnModuleInit {
  private authService: AuthServiceClient;

  constructor(@Inject(AUTH_SERVICE) private client: ClientGrpc) {}

  onModuleInit() {
    this.authService = this.client.getService<AuthServiceClient>(AUTH_SERVICE);
  }

  register(data: Omit<RegisterRequest, 'tenant'>) {
    return this.authService.register({
      email: data.email,
      password: data.password,
      tenant: environment.tenant,
    });
  }

  async login(data: Omit<LoginRequest, 'tenant'>) {
    return this.authService.login({
      email: data.email,
      password: data.password,
      tenant: environment.tenant,
    });
  }
}
