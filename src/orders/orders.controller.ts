import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PlainToInstance } from '../utils/interceptors/PlainToInstance.interceptor';
import { OrderDataDto } from './dto/order-data.dto';
import { OrdersService } from './orders.service';
import { UserToken } from '../utils/decorators/UserToken.decorator';

@UseGuards(JwtAuthGuard)
@PlainToInstance(OrderDataDto)
@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get('orders')
  async getOrders(@UserToken('id') id: string) {
    return await this.ordersService.findAllOrdersByUserId(id);
  }

  @Get('orders/:orderId')
  async getOrder(
    @UserToken('id') id: string,
    @Param('orderId') orderId: string,
  ) {
    return await this.ordersService.findOrderById(id, orderId);
  }

  @Post('order')
  async postOrder(@UserToken('id') id: string) {
    return await this.ordersService.createOrder(id);
  }
}
