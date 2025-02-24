import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { Exclude, Type } from 'class-transformer';
import { OrderItemDataDto } from './order-item-data.dto';

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

  @Type(() => OrderItemDataDto)
  order_items: OrderItemDataDto[];
}
