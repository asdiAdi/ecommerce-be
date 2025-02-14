import { Injectable } from '@nestjs/common';
import { Cart, CartItem } from './cart.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class CartsService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,
  ) {}

  async addCartItem(productId: string, quantity: number, userId?: string) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      if (!userId) {
      } else {
      }

      // check if cart is existing on user
      // I can skip this if I just requested for the cartId instead of the userId but nahhhh
      let cart = await queryRunner.manager.findOne(Cart, {
        where: { user_id: userId },
        relations: ['cart_items'],
      });

      // make a cart if none existed with 0 items
      if (!cart) {
        cart = queryRunner.manager.create(Cart, {
          user_id: userId,
          cart_items: [],
        });
        await queryRunner.manager.save(Cart, cart);
      }

      // find if product id already exist on the cart
      let cartItem = cart.cart_items.find(
        (cart_item) => cart_item.product_id === productId,
      );

      if (cartItem) {
        cartItem.quantity += quantity;
      } else {
        // add new product to cart
        cartItem = queryRunner.manager.create(CartItem, {
          cart,
          productId,
          quantity,
        });
        cart.cart_items.push(cartItem);
      }

      await queryRunner.manager.save(Cart, cart);
      await queryRunner.commitTransaction();
      return cart;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
