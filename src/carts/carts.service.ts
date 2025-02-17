import { ForbiddenException, Injectable } from '@nestjs/common';
import { Cart } from './cart.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CartItemDataDto } from './dto/cart-item-data.dto';
import { CartItem } from './cart-item.entity';
import { UpdateCartDto } from './dto/update-cart.dto';

@Injectable()
export class CartsService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,
  ) {}

  async findCart(userId?: string, cartId?: string) {
    let cart: Cart | null = null;

    if (userId) {
      cart = await this.cartRepository.findOne({
        where: { user_id: userId },
        relations: ['cart_items'],
      });
    } else if (cartId) {
      cart = await this.cartRepository.findOne({
        where: { id: cartId },
        relations: ['cart_items'],
      });
    }

    return cart;
  }

  async updateCart(item: UpdateCartDto, userId?: string, cartId?: string) {
    const { product_asin, quantity, operation } = item;
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      let cart = await this.findCart(userId, cartId);

      // make a cart if none existed with 0 items
      if (!cart) {
        // you can only subtract an item if cart exists
        // cart should always exist when cartId is known
        if (operation === 'subtract' || cartId) throw new ForbiddenException();

        cart = queryRunner.manager.create(Cart, {
          cart_items: [],
          ...(userId && { user_id: userId }),
        });

        await queryRunner.manager.save(Cart, cart);
      }

      // find if product id already exist on the cart
      let cartItem = cart.cart_items.find(
        (ci) => ci.product_asin === product_asin,
      );

      if (operation === 'add') {
        if (cartItem) {
          // add to existing
          cartItem.quantity += quantity;
        } else {
          // create new item with quantity
          const newCartItem = queryRunner.manager.create(CartItem, {
            cart_id: cart.id,
            product_asin,
            quantity,
          });

          cart.cart_items.push(newCartItem);
        }
      } else {
        // you can only subtract an item if cartItem exists on cart
        if (!cartItem) throw new ForbiddenException();
        if (cartItem.quantity > quantity) {
          // subtract if result is still greater than zero
          cartItem.quantity -= quantity;
        } else {
          // filter out the item if it exceeds the limit
          cart.cart_items = cart.cart_items.filter(
            (cart_item) => cart_item.product_asin !== product_asin,
          );
        }
      }

      if (cart.cart_items.length > 0) {
        // save cart
        await queryRunner.manager.save(Cart, cart);
      } else {
        // delete cart if there are 0 cartItems left
        await queryRunner.manager.delete(Cart, { id: cart.id });
      }

      await queryRunner.commitTransaction();
      return cart;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async mergeGuestToUserCart(userId: string, cartId: string) {
    // TODO: merge cart data to user when user logged in
  }
}
