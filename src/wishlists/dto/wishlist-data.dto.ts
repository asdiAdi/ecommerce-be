import { IsDate, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { Exclude, Type } from 'class-transformer';
import { ProductDataDto } from '../../products/dto/product-data.dto';

export class WishlistDataDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @Exclude()
  @IsUUID()
  user_id: string;

  @IsNotEmpty()
  @IsString()
  product_asin: string;

  @Exclude()
  @IsDate()
  created_at: Date;
  @Exclude()
  @IsDate()
  updated_at: Date;

  @Type(() => ProductDataDto)
  product: ProductDataDto;
}
