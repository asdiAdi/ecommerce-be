import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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
    return await this.usersRepository.findOneBy({ username });
  }

  // for admin
  // async findAll(username: string) {
  //   return await this.usersRepository.findBy({ username });
  // }

  async findOneById(id: string) {
    return await this.usersRepository.findOneBy({ id });
  }

  async updateOneById(id: string, payload: UpdateUserDto) {
    return await this.usersRepository.update(id, payload);
  }
}
