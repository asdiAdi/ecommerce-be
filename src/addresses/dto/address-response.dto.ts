import { AddressDataDto } from './address-data.dto';
import { OmitType } from '@nestjs/mapped-types';

export class AddressResponseDto extends OmitType(AddressDataDto, [
  // TODO: admin response where these are included
  'id',
  'created_at',
  'updated_at',
]) {}
