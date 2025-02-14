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
import { Exclude } from 'class-transformer';

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

  @IsUUID()
  category_id: string;

  @Exclude()
  @IsDate()
  created_at: Date;

  @Exclude()
  @IsDate()
  updated_at: Date;
}
