import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('register')
  test(@Body() data: { email: string; password: string }) {
    return this.appService.register({
      email: data.email,
      password: data.password,
    });
  }

  @Post('login')
  login(@Body() data: { email: string; password: string }) {
    return this.appService.login({
      email: data.email,
      password: data.password,
    });
  }
}
