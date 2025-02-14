import { OmitType } from '@nestjs/mapped-types';
import { ProductDataDto } from './product-data.dto';

export class UpdateProductDto extends OmitType(ProductDataDto, [
  'asin',
  'created_at',
  'updated_at',
]) {}
