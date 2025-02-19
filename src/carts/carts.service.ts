import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Cart } from './cart.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, FindOneOptions, Repository } from 'typeorm';
import { CartItem } from './cart-item.entity';
import { UpdateCartDto } from './dto/update-cart.dto';
import { ProductsService } from '../products/products.service';
import { Product } from '../products/product.entity';
import { CartQueryDto } from './dto/cart-query.dto';

@Injectable()
export class CartsService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,
    private readonly productsService: ProductsService,
  ) {}

  async findCartItems(
    cartQuery: CartQueryDto,
    userId?: string,
    cartId?: string,
  ) {
    const cart = await this.findCart(userId, cartId, { relations: undefined });
    let data: CartItem[] = [];
    let count: number = 0;

    if (cart) {
      const [_data, _count] = await this.cartItemRepository.findAndCount({
        where: { cart_id: cart.id },
        take: cartQuery.limit,
        skip: cartQuery.skip,
        order: {
          [cartQuery.order_by]: cartQuery.order,
        },
        relations: ['product'],
      });

      data = _data;
      count = _count;
    }

    const meta = cartQuery.getMetadata(count);
    return { data, meta };
  }

  async findCart(
    userId?: string,
    cartId?: string,
    options?: FindOneOptions<Cart>,
  ) {
    let cart: Cart | null = null;

    // TODO: update cart item quantity if product stock lowers

    if (userId) {
      cart = await this.cartRepository.findOne({
        where: { user_id: userId },
        relations: ['cart_items', 'cart_items.product'],
        ...(options ? { ...options } : {}),
      });
    } else if (cartId) {
      cart = await this.cartRepository.findOne({
        where: { id: cartId },
        relations: ['cart_items', 'cart_items.product'],
        ...(options ? { ...options } : {}),
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
          const total = cartItem.quantity + quantity;

          if (total > cartItem.product.stock)
            throw new ForbiddenException('Exceeded stock');

          cartItem.quantity += quantity;
        } else {
          // create new item with quantity
          const newCartItem = queryRunner.manager.create(CartItem, {
            cart_id: cart.id,
            product_asin,
            quantity,
          });
          // get product count
          const product = await this.productsService.findByAsin(product_asin);
          if (!product) throw new NotFoundException('Product not found');
          if (quantity > product.stock)
            throw new ForbiddenException('Exceeded stock');

          // explicit add
          await queryRunner.manager.save(CartItem, newCartItem);
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
          await queryRunner.manager.delete(CartItem, {
            cart_id: cartId,
            product_asin: product_asin,
          }); //explicit delete
          cart.cart_items = cart.cart_items.filter(
            (cart_item) => cart_item.product_asin !== product_asin,
          );
        }
      }

      if (cart.cart_items.length > 0) {
        // save cart

        // dont save products
        await queryRunner.manager.save(Cart, {
          ...cart,
          cart_items: cart.cart_items.map(({ product, ...val }) => ({
            ...val,
          })),
        });
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

  async deleteCart(userId: string, cartId: string) {
    return await this.cartRepository.delete({ user_id: userId, id: cartId });
  }
}
