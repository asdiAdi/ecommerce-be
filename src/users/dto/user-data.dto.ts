import {
  IsDate,
  IsEmail,
  IsOptional,
  IsUUID,
  Length,
  MaxLength,
} from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserDataDto {
  @IsUUID()
  id: string;

  @Expose()
  @Length(4, 16)
  username: string; // TODO: prevent user from sending blank spaces eg "user name"

  @Length(8, 16)
  password: string;

  @Expose()
  @IsOptional()
  @MaxLength(255)
  avatar?: string;

  @Expose()
  @IsOptional()
  @MaxLength(255)
  name?: string;

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
  @IsDate()
  birthdate?: Date;

  @IsDate()
  created_at: Date;

  @IsDate()
  updated_at: Date;
}
