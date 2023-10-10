import { Controller, Post, Body, UseGuards, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';

import { LoginAuthDto } from './dto/login-auth.dto';
import { LocalAuthGuard } from './local-guard.auth';

@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post()
  @UseGuards(LocalAuthGuard)
  async login(@Body() user: LoginAuthDto) {
    return this.authService.login(user.email);
  }
}
