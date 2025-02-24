import { IsEnum } from 'class-validator';
import { MetaQueryDto } from '../../utils/dto/meta-query.dto';
import { OrderBy } from '../../config/enums';

enum OrderOrderBy {
  name = 'name',
}

export class OrderQueryDto extends MetaQueryDto {
  @IsEnum({ ...OrderBy, ...OrderOrderBy })
  order_by: OrderBy | OrderOrderBy;

  get queries() {
    return {};
  }
}
