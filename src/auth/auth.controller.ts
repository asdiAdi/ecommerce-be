import { Body, Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }
  @Post('login')
  async login(@Body() createUserDto: CreateUserDto) {
    return this.authService.login(createUserDto);
  }
}
