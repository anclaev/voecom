import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CreateUserDto, SignInDto } from '@voecom/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('sign-up')
  createUser(@Body() dto: CreateUserDto) {
    this.auth.createUser(dto);
  }

  @HttpCode(200)
  @Post('sign-in')
  signIn(@Body() dto: SignInDto) {
    this.auth.signIn(dto);
  }
}
