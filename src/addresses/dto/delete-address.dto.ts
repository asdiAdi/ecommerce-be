import { AddressDataDto } from './address-data.dto';
import { PickType } from '@nestjs/mapped-types';

export class DeleteAddressDto extends PickType(AddressDataDto, ['id']) {}
