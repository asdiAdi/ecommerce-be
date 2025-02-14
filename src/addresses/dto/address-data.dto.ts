import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { Exclude } from 'class-transformer';

export class AddressDataDto {
  @IsUUID()
  id: string;

  @Exclude()
  @IsNotEmpty()
  @IsString()
  user_id: string;

  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsNotEmpty()
  @MaxLength(255)
  address_line_1: string;

  @IsOptional()
  @MaxLength(255)
  address_line_2?: string;

  @IsNotEmpty()
  @MaxLength(255)
  city: string;

  @IsNotEmpty()
  @MaxLength(255)
  state: string;

  @IsNotEmpty()
  @MaxLength(255)
  zip_code: string;

  @IsNotEmpty()
  @MaxLength(255)
  country: string;

  @IsNotEmpty()
  @MaxLength(255)
  phone_number: string;

  @IsOptional()
  @IsString()
  description?: string;

  @Exclude()
  @IsDate()
  created_at: Date;

  @Exclude()
  @IsDate()
  updated_at: Date;
}
