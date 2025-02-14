import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Category } from '../utils/entity/category.entity';

@Entity({ name: 'products' })
export class Product {
  @PrimaryColumn('string')
  asin: string;
  @Column({ type: 'text' })
  title: string;
  @Column({ type: 'text' })
  description: string;
  @Column({ type: 'varchar', length: 255 })
  img_url: string;
  @Column({ type: 'varchar', length: 255 })
  product_url: string;
  @Column({ type: 'decimal', precision: 2, scale: 1 })
  stars: number;
  @Column({ type: 'int' })
  reviews: number;
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;
  @Column({ type: 'int' })
  stock: number;
  @Column({ type: 'boolean' })
  is_best_seller: boolean;
  @Column({ type: 'int' })
  bought_in_last_month: number;
  @Column({ type: 'uuid' })
  category_id: string;
  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;
  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;
}
