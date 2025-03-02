import { UserDataDto } from './user-data.dto';
import { PickType } from '@nestjs/mapped-types';

export class UpdateUserDto extends PickType(UserDataDto, [
  'first_name',
  'last_name',
  'email',
  'avatar',
  'phone',
  'birthdate',
]) {}
