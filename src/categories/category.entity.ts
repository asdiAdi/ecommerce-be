import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Product } from '../products/product.entity';

// TODO: add Categories CRUD when making admin site
@Entity({ name: 'categories' })
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'uuid', nullable: true, unique: true })
  parent_id: string;
  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;
  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;
  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  // A category can have a parent category
  @ManyToOne(() => Category, (category) => category.subcategories, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  parent: Category;

  // One category can have multiple subcategories
  @OneToMany(() => Category, (category) => category.parent, {
    cascade: true,
  })
  subcategories: Category[];

  @OneToMany(() => Product, (product) => product.category, {
    cascade: true,
  })
  products: Product[];
}
