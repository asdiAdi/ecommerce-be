import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import { Order, OrderBy } from '../../config/enums';
import { Transform } from 'class-transformer';

export class MetaQueryDto {
  @IsEnum(Order)
  @IsOptional()
  readonly order: Order = Order.ASC;

  @IsOptional()
  @IsEnum(OrderBy)
  readonly order_by: string = OrderBy.created_at;

  @IsInt()
  @Min(0)
  @IsOptional()
  @Transform(({ value }) => (value ? parseInt(value, 10) : undefined))
  readonly offset: number = 0;

  @IsInt()
  @Min(1)
  @Max(500)
  @IsOptional()
  @Transform(({ value }) => (value ? parseInt(value, 10) : undefined))
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
