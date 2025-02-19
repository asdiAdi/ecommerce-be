import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { Exclude, Type } from 'class-transformer';

export class OrderDataDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsUUID()
  user_id?: string;

  @IsNumber()
  total_price?: string;

  @IsString()
  @MaxLength(50)
  status: string;

  @Exclude()
  @IsDate()
  created_at: Date;
  @Exclude()
  @IsDate()
  updated_at: Date;
}
