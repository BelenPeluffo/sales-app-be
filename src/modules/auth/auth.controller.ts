import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor() {}

  @Post('login')
  login(@Body() dto: LoginDto) {
    return dto.username;
  }
}
