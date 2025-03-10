import { MetaQueryDto } from '../../utils/dto/meta-query.dto';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { OrderBy } from '../../config/enums';
import { FindOptionsWhere, ILike } from 'typeorm';
import { Product } from '../product.entity';

enum ProductOrderBy {
  title = 'title',
  stars = 'stars',
  reviews = 'reviews',
  price = 'price',
  stock = 'stock',
}

export class ProductQueryDto extends MetaQueryDto {
  @IsString()
  @IsOptional()
  search: string;

  @IsString()
  @IsOptional()
  category_name: string;

  @IsEnum({ ...OrderBy, ...ProductOrderBy })
  order_by: OrderBy | ProductOrderBy;

  limit: number = 20;

  get queries(): FindOptionsWhere<Product> {
    return {
      ...(this.search && { title: ILike(`%${this.search}%`) }),
      ...(this.category_name && { category: { name: this.category_name } }),
    };
  }
}
