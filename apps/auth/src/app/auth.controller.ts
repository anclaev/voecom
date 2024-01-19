import { AUTH, CreateUserDto, SignInDto } from '@voecom/common';

import { MessagePattern, Payload } from '@nestjs/microservices';
import { Controller, UseFilters, ValidationPipe } from '@nestjs/common';

import { AuthService } from './auth.service';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';

@Controller()
export class AuthController {
  constructor(private auth: AuthService) {}

  // @MessagePattern(AUTH_MESSAGES.CREATE_USER)
  @RMQValidate()
  @RMQRoute(AUTH.CREATE_USER)
  handleUserCreate(data: CreateUserDto) {
    return this.auth.signUp(data);
  }

  // @MessagePattern(AUTH_MESSAGES.SIGN_IN)
  @RMQValidate()
  @RMQRoute(AUTH.SIGN_IN)
  async handleSignIn(data: SignInDto) {
    console.log(data);
    return await this.auth.signIn(data);
  }
}
