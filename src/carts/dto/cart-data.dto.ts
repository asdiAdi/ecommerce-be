import { IsDate, IsNotEmpty, IsUUID } from 'class-validator';
import { Exclude, Type } from 'class-transformer';
import { CartItemDataDto } from './cart-item-data.dto';

export class CartDataDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsUUID()
  user_id?: string;

  @Exclude()
  @IsDate()
  created_at: Date;
  @Exclude()
  @IsDate()
  updated_at: Date;

  @Type(() => CartItemDataDto)
  cart_items: CartItemDataDto[];
}
