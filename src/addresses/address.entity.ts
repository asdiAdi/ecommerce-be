import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/user.entity';

@Entity({ name: 'addresses' })
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'uuid' })
  user_id: string;
  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;
  @Column({ type: 'varchar', length: 255, nullable: false })
  address_line_1: string;
  @Column({ type: 'varchar', length: 255, nullable: false })
  address_line_2: string;
  @Column({ type: 'varchar', length: 255, nullable: false })
  city: string;
  @Column({ type: 'varchar', length: 255, nullable: false })
  state: string;
  @Column({ type: 'varchar', length: 255, nullable: false })
  zip_code: string;
  @Column({ type: 'varchar', length: 255, nullable: false })
  country: string;
  @Column({ type: 'varchar', length: 255, nullable: false })
  phone_number: string;
  @Column({ type: 'text', nullable: true })
  description: string;
  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;
  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.addresses, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
