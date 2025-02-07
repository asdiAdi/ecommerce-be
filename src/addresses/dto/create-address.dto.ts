import { AddressDataDto } from './address-data.dto';
import { OmitType } from '@nestjs/mapped-types';

export class CreateAddressDto extends OmitType(AddressDataDto, [
  'id',
  'created_at',
  'updated_at',
]) {}
