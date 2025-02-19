import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';
import { Exclude, Type } from 'class-transformer';
import { ProductDataDto } from '../../products/dto/product-data.dto';

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

  @Exclude()
  @IsDate()
  created_at: Date;
  @Exclude()
  @IsDate()
  updated_at: Date;

  @Type(() => ProductDataDto)
  product: ProductDataDto;
}
