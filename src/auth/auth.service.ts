import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findOne(username);
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        return user;
      }
    }

    throw new NotFoundException('User not found');
  }

  async signup(user: CreateUserDto) {
    // check if user exists first
    if (await this.usersService.findOne(user.username)) {
      throw new ConflictException('User already exists');
    }

    const { username, id } = await this.usersService.create(user);
    return {
      access_token: this.jwtService.sign({ username, id }),
    };
  }

  async login(user: CreateUserDto) {
    const _user = await this.validateUser(user.username, user.password);
    const payload = { username: _user.username, id: _user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
