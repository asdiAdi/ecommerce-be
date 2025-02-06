import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(user: CreateUserDto) {
    const hash = await bcrypt.hash(user.password, 10);
    const payload = {
      username: user.username,
      password: hash,
    };

    return await this.usersRepository.save(payload);
  }

  async findOne(username: string) {
    return await this.usersRepository.findOne({ where: { username } });
  }

  async findAll(username: string) {
    return await this.usersRepository.findBy({ username });
  }

  async findOneById(id: number) {
    return await this.usersRepository.findOne({ where: { id } });
  }
}
