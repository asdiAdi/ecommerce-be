import { ForbiddenException, Injectable } from '@nestjs/common';
import { DataSource, FindOneOptions, Repository } from 'typeorm';
import { Order } from './order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItem } from './order-item.entity';
import { CartsService } from '../carts/carts.service';

@Injectable()
export class OrdersService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,

    private readonly cartsService: CartsService,
  ) {}

  async findOrderById(
    userId: string,
    orderId: string,
    options?: FindOneOptions<Order>,
  ) {
    return await this.orderRepository.findOne({
      where: {
        id: orderId,
        user_id: userId,
      },
      ...(options ? { ...options } : {}),
    });
  }

  async findAllOrdersByUserId(userId: string) {
    return await this.orderRepository.find({
      where: { user_id: userId },
      relations: ['order_items'],
    });
  }

  // async createOrderItem(orderId: string) {
  //   return await this.orderItemRepository.save({}, {});
  // }

  async createOrder(userId: string) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      // get cart items
      const cart = await this.cartsService.findCart(userId);

      // should not be able to create order if user has no cart
      if (!cart) throw new ForbiddenException();

      // create an order
      let order = new Order();

      //
      order.user_id = cart.user_id;
      order.total_price = cart.cart_items.reduce(
        (prev, cur) => prev + cur.product.price * cur.quantity,
        0,
      );
      order.status = 'PENDING';

      order = queryRunner.manager.create(Order, order);
      await queryRunner.manager.save(order);

      for (const cartItem of cart.cart_items) {
        // save all cart items
        let orderItem = queryRunner.manager.create(OrderItem, {
          order_id: order.id,
          product_asin: cartItem.product_asin,
          quantity: cartItem.quantity,
          price: cartItem.product.price,
        });

        await queryRunner.manager.save(OrderItem, orderItem);

        // TODO: reduce product stock
      }

      // delete cart
      await this.cartsService.deleteCart(userId, cart.id);

      await queryRunner.commitTransaction();
      // return updated order
      return this.findOrderById(userId, order.id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
