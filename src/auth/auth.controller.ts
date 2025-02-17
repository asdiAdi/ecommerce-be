import { Body, Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthTokenDto } from './dto/auth-token.dto';
import { PlainToInstance } from '../utils/interceptors/PlainToInstance.interceptor';
import { CartsService } from '../carts/carts.service';
import { Cookie } from '../utils/decorators/Cookie.decorator';

@PlainToInstance(AuthTokenDto)
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private cartsService: CartsService,
  ) {}

  @Post('signup')
  async signup(
    @Body() createUserDto: CreateUserDto,
    @Cookie('cart_id') cartId?: string,
  ) {
    const { id, ...rest } = await this.authService.signup(createUserDto);
    if (cartId) await this.cartsService.mergeGuestToUserCart(id, cartId);
    return rest;
  }

  @Post('login')
  async login(
    @Body() createUserDto: CreateUserDto,
    @Cookie('cart_id') cartId?: string,
  ) {
    const { id, ...rest } = await this.authService.login(createUserDto);
    if (cartId) await this.cartsService.mergeGuestToUserCart(id, cartId);
    return rest;
  }
}
