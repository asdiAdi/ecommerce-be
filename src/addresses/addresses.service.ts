import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './address.entity';
import { Repository } from 'typeorm';
import { UpdateAddressDto } from './dto/update-address.dto';
import { CreateAddressDto } from './dto/create-address.dto';
import { AddressQueryDto } from './dto/address-query.dto';

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

  async findAllByUserId(id: string, addressQuery: AddressQueryDto) {
    const [data, count] = await this.addressesRepository.findAndCount({
      where: { user_id: id, ...addressQuery.queries },
      take: addressQuery.limit,
      skip: addressQuery.skip,
      order: {
        [addressQuery.order_by]: addressQuery.order,
      },
    });

    const meta = addressQuery.getMetadata(count);
    return { data, meta };
  }

  async updateById(userId: string, id: string, payload: UpdateAddressDto) {
    await this.addressesRepository.update({ user_id: userId, id: id }, payload);
    return true;
  }

  async deleteById(userId: string, id: string) {
    return await this.addressesRepository.delete({ user_id: userId, id: id });
  }
}
