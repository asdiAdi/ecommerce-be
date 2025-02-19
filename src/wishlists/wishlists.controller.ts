import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PlainToInstance } from '../utils/interceptors/PlainToInstance.interceptor';
import { WishlistDataDto } from './dto/wishlist-data.dto';
import { UserToken } from '../utils/decorators/UserToken.decorator';
import { WishlistQueryDto } from './dto/wishlist-query.dto';
import { CreateWishlistDto } from './dto/create-wishlist.dto';

@UseGuards(JwtAuthGuard)
@Controller('wishlist')
@PlainToInstance(WishlistDataDto)
export class WishlistsController {
  constructor(private readonly wishlistService: WishlistsService) {}

  @Post('/add')
  async postWishlist(
    @UserToken('id') id: string,
    @Body() createWishlistDto: CreateWishlistDto,
  ) {
    await this.wishlistService.create(id, createWishlistDto);
    return true;
  }

  @Get()
  async getWishlist(
    @UserToken('id') userId: string,
    @Query() query: WishlistQueryDto,
  ) {
    return await this.wishlistService.findAllByUserId(userId, query);
  }

  @Delete('/:wishlistId')
  async deleteWishlist(
    @UserToken('id') userId: string,
    @Param('wishlistId', ParseUUIDPipe) id: string,
  ) {
    await this.wishlistService.deleteById(userId, id);
    return true;
  }
}
