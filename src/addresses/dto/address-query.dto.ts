import { IsOptional, IsString } from 'class-validator';
import { AddressDataDto } from './address-data.dto';
import { Exclude, Expose } from 'class-transformer';
import { Address } from '../address.entity';
import { FindOptionsWhere } from 'typeorm';
import { MetaQueryDto } from '../../utils/dto/meta-query.dto';

// describe all available queries
export class AddressQueryDto extends MetaQueryDto {
  @IsString()
  @IsOptional()
  search: string;

  get queries(): FindOptionsWhere<Address> {
    return { name: this.search };
  }
}
