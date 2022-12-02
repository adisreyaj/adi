import { AUTH_SERVICE, AuthMethod, RegisterRequest } from '@adi/authx-proto';
import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @GrpcMethod(AUTH_SERVICE, AuthMethod.Register)
  async register(data: RegisterRequest) {
    await this.appService.register(data.email, data.password);
    return {
      success: true,
      token: data.email,
    };
  }
}
