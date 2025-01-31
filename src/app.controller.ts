import { Controller, Request, Get, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController extends AppService {
  constructor(private readonly appService: AppService) {
    super();
  }

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req: { user: string }) {
    return req.user;
  }

  // @Get('test')
  // getHello(): string {
  //   return this.appService.getHello();
  // }
  //
  // @Get('test2')
  // getHi(): string {
  //   return this.appService.getHi();
  // }
}
