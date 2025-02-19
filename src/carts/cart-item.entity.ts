import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from '../products/product.entity';
import { Cart } from './cart.entity';

@Entity('cart_items')
export class CartItem {
  @Column({ type: 'uuid', primary: true })
  cart_id: string;
  @Column({
    type: 'varchar',
    length: '10',
    primary: true,
    nullable: false,
    unique: true,
  })
  product_asin: string;
  @Column({ type: 'integer' })
  quantity: number;
  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;
  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @ManyToOne(() => Cart, (cart) => cart.cart_items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cart_id' })
  cart: Cart;

  @ManyToOne(() => Product, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_asin' })
  product: Product;
}
