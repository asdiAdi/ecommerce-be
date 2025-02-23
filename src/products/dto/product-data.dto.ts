import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { Exclude, Transform, Type } from 'class-transformer';
import { Category } from '../../categories/category.entity';
import { Product } from '../product.entity';

export class ProductDataDto {
  @IsString()
  asin: string;

  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @MaxLength(255)
  img_url: string;

  @IsString()
  @MaxLength(255)
  @IsOptional()
  product_url?: string;

  @Max(5)
  @Min(0)
  @IsOptional()
  stars?: number;

  @IsNumber()
  @IsOptional()
  reviews?: number;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @Min(0)
  stock: number;

  @IsBoolean()
  @IsOptional()
  is_best_seller?: boolean;

  @IsNumber()
  @IsOptional()
  bought_in_last_month?: number;

  @Exclude()
  @IsUUID()
  category_id: string;

  // @Exclude()
  category: Category;

  @Type(() => Category)
  @Transform(({ value }: { value: Category }) => value.name, {
    toClassOnly: true,
  })
  category_name: string;

  @Exclude()
  @IsDate()
  created_at: Date;

  @Exclude()
  @IsDate()
  updated_at: Date;
}
