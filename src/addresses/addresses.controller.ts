import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PlainToInstance } from '../utils/interceptors/PlainToInstance.interceptor';
import { CreateAddressDto } from './dto/create-address.dto';
import { AddressDataDto } from './dto/address-data.dto';
import { MetaQueryDto } from '../utils/dto/meta-query.dto';
import { UserToken } from '../utils/decorators/UserToken.decorator';
import { AddressQueryDto } from './dto/address-query.dto';

@Controller()
@UseGuards(JwtAuthGuard)
@PlainToInstance(AddressDataDto)
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @Post('address')
  async createAddress(
    @UserToken('id') id: string,
    @Body() createAddressDto: CreateAddressDto,
  ) {
    await this.addressesService.create(id, createAddressDto);
    return true;
  }

  @Get('addresses')
  async getAddresses(
    @UserToken('id') id: string,
    @Query() query: AddressQueryDto,
    @Query() metaQueryDto: MetaQueryDto,
  ) {
    return await this.addressesService.findAllByUserId(id, query, metaQueryDto);
  }

  // @Get('addresses/:id')

  // @Get('address/:addressId')
  // async putAddress(@Body() userTokenDto: UserTokenDto) {
  //   await this.addressesService.findAllByUserId(userTokenDto.id);
  // }
}
