import { UserDataDto } from './user-data.dto';
import { OmitType } from '@nestjs/mapped-types';

export class UserResponseDto extends OmitType(UserDataDto, ['password']) {}
