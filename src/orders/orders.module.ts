import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { CartsModule } from '../carts/carts.module';
import { OrderItem } from './order-item.entity';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [
    CartsModule,
    ProductsModule,
    TypeOrmModule.forFeature([Order, OrderItem]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
