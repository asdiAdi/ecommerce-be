import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PlainToInstance } from '../utils/interceptors/PlainToInstance.interceptor';
import { CreateAddressDto } from './dto/create-address.dto';
import { AddressDataDto } from './dto/address-data.dto';
import { UserToken } from '../utils/decorators/UserToken.decorator';
import { AddressQueryDto } from './dto/address-query.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Controller()
@UseGuards(JwtAuthGuard)
@PlainToInstance(AddressDataDto)
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @Post('address/create')
  async postAddress(
    @UserToken('id') id: string,
    @Body() createAddressDto: CreateAddressDto,
  ) {
    await this.addressesService.create(id, createAddressDto);
    return true;
  }

  @Get('address/:addressId')
  async getAddress(@Param('addressId') addressId: string) {
    return await this.addressesService.findOneById(addressId);
  }
  @Get('addresses')
  async getAddresses(
    @UserToken('id') id: string,
    @Query() query: AddressQueryDto,
  ) {
    return await this.addressesService.findAllByUserId(id, query);
  }

  @Put('address/:addressId')
  async putAddress(
    @UserToken('id') userId: string,
    @Param('addressId', ParseUUIDPipe) id: string,
    @Body() updateAddressDto: UpdateAddressDto,
  ) {
    return await this.addressesService.updateById(userId, id, updateAddressDto);
  }

  @Delete('address/:addressId')
  async deleteAddress(
    @UserToken('id') userId: string,
    @Param('addressId', ParseUUIDPipe) id: string,
  ) {
    return await this.addressesService.deleteById(userId, id);
  }
}
