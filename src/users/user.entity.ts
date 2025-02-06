import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 16, unique: true, nullable: false })
  username: string;
  @Column({ type: 'varchar', length: 255, nullable: false }) //hashed
  password: string;
  @Column({ type: 'varchar', length: 255, nullable: true })
  name: string;
  @Column({ type: 'varchar', length: 255, unique: true, nullable: true })
  email: string;
  @Column({ type: 'varchar', length: 255, nullable: true })
  phone: string;
  @Column({ type: 'date', nullable: true })
  birthdate: Date;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
}
