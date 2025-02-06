import { UserDataDto } from './user-data.dto';
import { PickType } from '@nestjs/mapped-types';

export class CreateUserDto extends PickType(UserDataDto, [
  'username',
  'password',
]) {}
