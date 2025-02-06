import {
  IsDate,
  IsEmail,
  IsOptional,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';

export class UserDataDto {
  @IsPositive()
  id: number;

  @IsString()
  @Length(4, 16)
  username: string;

  @IsString()
  @Length(8, 16)
  // @IsStrongPassword()
  password: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsDate()
  birthdate?: Date;

  @IsDate()
  created_at: Date;

  @IsDate()
  updated_at: Date;
}
