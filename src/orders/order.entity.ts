import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { OrderItem } from './order-item.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'uuid', nullable: false })
  user_id: string | null;
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  total_price: number;
  @Column({ type: 'varchar', length: 50, nullable: false })
  status: string;
  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;
  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @ManyToOne(() => User, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => OrderItem, (order_item) => order_item.order, {
    cascade: true,
    // eager: true, // will automatically load cart_item
  })
  order_items: OrderItem[];
}
