import { IsNotEmpty, IsNumber, IsString, IsUUID, Min } from 'class-validator';

export class CartItemDataDto {
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
