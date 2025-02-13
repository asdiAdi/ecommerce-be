import {
  Controller,
  Get,
  UseGuards,
  Put,
  NotFoundException,
  Body,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from './users.service';
import { UserDataDto } from './dto/user-data.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PlainToInstance } from '../utils/interceptors/PlainToInstance.interceptor';
import { UserToken } from '../utils/decorators/UserToken.decorator';

@Controller('user')
@UseGuards(JwtAuthGuard)
@PlainToInstance(UserDataDto)
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUser(@UserToken('id') id: string) {
    const user = await this.usersService.findOneById(id);
    if (!user) {
      // should be impossible if jwt implementation is correct
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Put()
  async putUser(
    @UserToken('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    await this.usersService.updateOneById(id, updateUserDto);
    return true;
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
