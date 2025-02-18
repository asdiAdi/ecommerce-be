import { IsNotEmpty, IsNumber, IsString, IsUUID, Min } from 'class-validator';
import { Exclude } from 'class-transformer';

export class CartItemDataDto {
  @Exclude()
  @IsNotEmpty()
  @IsUUID()
  cart_id: string;

  @IsNotEmpty()
  @IsString()
  product_asin: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  quantity: number;
}
