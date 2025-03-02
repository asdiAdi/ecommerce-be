import { OmitType } from '@nestjs/mapped-types';
import { CartItemDataDto } from './cart-item-data.dto';
import { IsEnum, IsOptional } from 'class-validator';

export enum Operation {
  add = 'add',
  subtract = 'subtract',
}
export class UpdateCartDto extends OmitType(CartItemDataDto, [
  'cart_id',
  'created_at',
  'updated_at',
]) {
  @IsEnum(Operation)
  @IsOptional()
  operation: Operation = Operation.add;
}
