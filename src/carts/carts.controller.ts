import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CartsService } from './carts.service';
import { UserToken } from '../utils/decorators/UserToken.decorator';
import { JwtAuthGuardOptional } from '../auth/jwt-auth-optional.guard';
import { Cookie } from '../utils/decorators/Cookie.decorator';
import { Response } from 'express';
import { UpdateCartDto } from './dto/update-cart.dto';
import { PlainToInstance } from '../utils/interceptors/PlainToInstance.interceptor';
import { CartDataDto } from './dto/cart-data.dto';
import { CartQueryDto } from './dto/cart-query.dto';

@Controller('cart')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Get()
  @UseGuards(JwtAuthGuardOptional)
  @PlainToInstance(CartDataDto)
  async getCart(
    @Cookie('cart_id') cart_id: string,
    @Query() query: CartQueryDto,
    @UserToken('id') id?: string,
  ) {
    return await this.cartsService.findCartItems(query, id, cart_id);
  }

  @Post('/add-to-cart/')
  @UseGuards(JwtAuthGuardOptional)
  async addToCart(
    @Res() res: Response,
    @Cookie('cart_id') cart_id: string,
    @Body() updateCartDto: UpdateCartDto,
    @UserToken('id') id?: string,
  ) {
    const cart = await this.cartsService.updateCart(updateCartDto, id, cart_id);

    if (!id) {
      // if logged out set the cookie
      if (cart.cart_items.length > 0) {
        res.cookie('cart_id', cart.id);
      } else {
        res.clearCookie('cart_id');
      }
    }

    res.send(true);
  }
}
