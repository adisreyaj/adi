import {
  AUTH_SERVICE,
  AuthMethod,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
} from '@adi/authx-proto';
import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @GrpcMethod(AUTH_SERVICE, AuthMethod.Register)
  async register(data: RegisterRequest) {
    return this.appService.register(data);
  }

  @GrpcMethod(AUTH_SERVICE, AuthMethod.Login)
  async login(data: LoginRequest): Promise<LoginResponse> {
    return this.appService.login(data);
  }
}
