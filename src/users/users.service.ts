import { Injectable } from '@nestjs/common';

export type User = {
  userId: string;
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};

@Injectable()
export class UsersService {
  //TODO: from db
  private readonly users: User[] = [
    {
      userId: 'a',
      username: 'carl',
      password: 'wawa',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
