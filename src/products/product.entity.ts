import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  ManyToOne,
  Index,
} from 'typeorm';
import { Category } from '../categories/category.entity';

@Entity({ name: 'products' })
export class Product {
  @PrimaryColumn('varchar', { length: 10 })
  asin: string;
  @Index('idx_title', { synchronize: false })
  @Column({ type: 'text' })
  title: string;
  @Column({ type: 'text', nullable: true })
  description: string;
  @Column({ type: 'varchar', length: 255 })
  img_url: string;
  @Column({ type: 'varchar', length: 255, nullable: true })
  product_url: string;
  @Column({ type: 'decimal', precision: 2, scale: 1, nullable: true })
  stars: number;
  @Column({ type: 'int', nullable: true })
  reviews: number;
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;
  @Column({ type: 'int' })
  stock: number;
  @Column({ type: 'boolean', nullable: true })
  is_best_seller: boolean;
  @Column({ type: 'int', nullable: true })
  bought_in_last_month: number;
  @Column({ type: 'uuid', nullable: false })
  category_id: string;
  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;
  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;
}
