import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Address } from '../address.entity';
import { FindOptionsWhere, ILike } from 'typeorm';
import { MetaQueryDto } from '../../utils/dto/meta-query.dto';
import { OrderBy } from '../../config/enums';

enum AddressOrderBy {
  name = 'name',
}

// enum AddressSearchBy {
//   city = 'city',
// }

export class AddressQueryDto extends MetaQueryDto {
  @IsString()
  @IsOptional()
  search: string;

  // TODO: try to support search by AddressSearchBy enum
  // @IsString()
  // @IsOptional()
  // search_by?: string;

  @IsEnum({ ...OrderBy, ...AddressOrderBy })
  order_by: OrderBy | AddressOrderBy;

  get queries(): FindOptionsWhere<Address> {
    return {
      ...(this.search && { name: ILike(`%${this.search}%`) }),
    };
  }
}
