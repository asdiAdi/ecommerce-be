import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { Order, OrderBy } from '../../config/enums';

export class MetaQueryDto {
  @IsEnum(Order)
  @IsOptional()
  readonly order: Order = Order.ASC;

  @IsOptional()
  @IsEnum(OrderBy)
  readonly order_by: string = OrderBy.created_at;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  @IsOptional()
  readonly offset: number = 0;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(500)
  @IsOptional()
  readonly limit: number = 10;

  // getters
  get skip(): number {
    return this.offset * this.limit;
  }

  // functions
  getMetadata(count: number): MetaData {
    return {
      total_pages: Math.ceil(count / this.limit),
      total_rows: count,
      order: this.order,
      order_by: this.order_by,
      limit: this.limit,
      offset: this.offset,
    };
  }
}
