import {
  IsDate,
  IsDateString,
  IsEmail,
  IsOptional,
  IsStrongPassword,
  IsUUID,
  Length,
  Matches,
  MaxLength,
} from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserDataDto {
  @IsUUID()
  id: string;

  @Expose()
  @Length(4, 16)
  @Matches(/^\S+$/, { message: 'Username must not contain spaces' })
  username: string;

  @Length(8, 16)
  @IsStrongPassword()
  password: string;

  @Expose()
  @IsOptional()
  @MaxLength(255)
  avatar?: string;

  @Expose()
  @IsOptional()
  @MaxLength(255)
  first_name?: string;

  @Expose()
  @IsOptional()
  @MaxLength(255)
  last_name?: string;

  @Expose()
  @IsOptional()
  @IsEmail()
  @MaxLength(255)
  email?: string;

  @Expose()
  @IsOptional()
  @MaxLength(255)
  phone?: string;

  @Expose()
  @IsOptional()
  birthdate?: string;

  @IsDate()
  created_at: Date;

  @IsDate()
  updated_at: Date;
}
