import { IsEnum } from 'class-validator';
import { MetaQueryDto } from '../../utils/dto/meta-query.dto';
import { OrderBy } from '../../config/enums';

enum WishlistOrderBy {
  name = 'name',
}

export class WishlistQueryDto extends MetaQueryDto {
  @IsEnum({ ...OrderBy, ...WishlistOrderBy })
  order_by: OrderBy | WishlistOrderBy;

  get queries() {
    return {};
  }
}
