import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { Order, OrderBy } from '../../config/enums';

export class MetaQueryDto {
  @IsEnum(Order)
  @IsOptional()
  readonly order?: Order = Order.ASC;

  @IsString()
  @IsOptional()
  @IsEnum(OrderBy)
  readonly order_by?: OrderBy = OrderBy.created_at;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly offset?: number = 1;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(500)
  @IsOptional()
  readonly limit?: number = 10;

  // @Type(() => Number)
  // @IsInt()
  // @Min(1)
  // @IsOptional()
  // readonly total_pages?: number = 1;
}
