import { IsNotEmpty, IsNumber, IsString, IsUUID, Min } from 'class-validator';
import { Exclude, Type } from 'class-transformer';
import { ProductDataDto } from '../../products/dto/product-data.dto';

export class OrderItemDataDto {
  @Exclude()
  @IsNotEmpty()
  @IsUUID()
  order_id: string;

  @IsNotEmpty()
  @IsString()
  product_asin: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  quantity: number;

  @Type(() => ProductDataDto)
  product: ProductDataDto;
}
