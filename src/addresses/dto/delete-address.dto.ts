import { AddressDataDto } from './address-data.dto';
import { PickType } from '@nestjs/mapped-types';

// IMPROVEMENT: support delete multiple ids
export class DeleteAddressDto extends PickType(AddressDataDto, ['id']) {}
