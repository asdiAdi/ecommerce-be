import {
  Controller,
  Get,
  UseGuards,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserToken } from './userToken.decorator';
import { UsersService } from './users.service';
import { UserTokenDto } from './dto/user-token.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('current')
  async getCurrentUser(@UserToken() userTokenDto: UserTokenDto) {
    const user = await this.usersService.findOneById(userTokenDto.id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const { password, ...rest } = user;
    return rest;
  }

  @Put('current')
  async putCurrentUser(@UserToken() userTokenDto: UserTokenDto) {
    const user = await this.usersService.findOneById(userTokenDto.id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const { password, ...rest } = user;
    return rest;
  }

  // TODO: for admin role
  // @Get()
  // async getUsers(@Query('username') username: string) {}
  //
  // @Get(':id')
  // async getUserById(@Param('id', ParseIntPipe) id: number) {}
  //
  // @Put(':id')
  // async putUserById(@Param('id', ParseIntPipe) id: number) {}
}
