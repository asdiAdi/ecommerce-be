import { OmitType } from '@nestjs/mapped-types';
import { WishlistDataDto } from './wishlist-data.dto';

export class CreateWishlistDto extends OmitType(WishlistDataDto, [
  'id',
  'user_id',
  'created_at',
  'updated_at',
]) {}
