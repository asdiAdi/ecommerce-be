import {
  IsDate,
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

  // minLength: 8
  // minLowercase: 1
  // minUppercase: 1
  // minNumbers: 1
  // minSymbols: 1
  // returnScore: false
  // pointsPerUnique: 1
  // pointsPerRepeat: 0.5
  // pointsForContainingLower: 10
  // pointsForContainingUpper: 10
  // pointsForContainingNumber: 10
  // pointsForContainingSymbol: 10
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
