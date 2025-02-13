import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './address.entity';
import { Repository } from 'typeorm';
import { UpdateAddressDto } from './dto/update-address.dto';
import { CreateAddressDto } from './dto/create-address.dto';
import { AddressQueryDto } from './dto/address-query.dto';
import { MetaQueryDto } from '../utils/dto/meta-query.dto';
import { getMetaData } from '../utils/common';

@Injectable()
export class AddressesService {
  constructor(
    @InjectRepository(Address)
    private addressesRepository: Repository<Address>,
  ) {}

  async create(userId: string, address: CreateAddressDto) {
    const payload = {
      ...address,
      user_id: userId,
    };

    await this.addressesRepository.save(payload);
  }

  async findOneById(id: string) {
    return await this.addressesRepository.findOneBy({ id });
  }

  // add these overloads if I want to support both paginated and non-paginated data
  async findAllByUserId(
    id: string,
    addressQuery: AddressQueryDto,
  ): Promise<Address[]>;
  // overload
  async findAllByUserId(
    id: string,
    addressQuery: AddressQueryDto,
    metaQuery: MetaQueryDto,
  ): Promise<{ data: Address[]; meta: MetaData }>;
  async findAllByUserId(
    id: string,
    addressQuery: AddressQueryDto,
    metaQuery?: MetaQueryDto,
  ) {
    if (metaQuery) {
      const [data, count] = await this.addressesRepository.findAndCount({
        where: { user_id: id, ...addressQuery.queries },
        take: metaQuery.limit,
        skip: metaQuery.offset,
        order: {
          [metaQuery.order_by ?? 'created_at']: metaQuery.order,
        },
      });

      const meta = getMetaData(metaQuery, count);
      console.log({ metaQuery }, count);

      return { data, meta, ...addressQuery.queries };
    } else {
      return await this.addressesRepository.find({
        where: { user_id: id },
      });
    }
  }

  async updateById(id: string, payload: UpdateAddressDto) {
    return await this.addressesRepository.update(id, payload);
  }

  async deleteById(id: string) {
    return await this.addressesRepository.delete(id);
  }
}
