import { UserDataDto } from './user-data.dto';
import { PickType } from '@nestjs/mapped-types';
import { IsNumber } from 'class-validator';

export class UserTokenDto extends PickType(UserDataDto, ['id', 'username']) {
  @IsNumber()
  iat: number;

  @IsNumber()
  exp: number;
}
