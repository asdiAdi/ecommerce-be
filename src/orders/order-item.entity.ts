import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from '../products/product.entity';
import { Order } from './order.entity';

@Entity('order_items')
export class OrderItem {
  @Column({ type: 'uuid', primary: true })
  order_id: string;
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
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number; // price at purchase

  @ManyToOne(() => Order, (order) => order, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ManyToOne(() => Product, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_asin' })
  product: Product;
}
