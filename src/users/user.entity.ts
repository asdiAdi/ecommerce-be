import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'varchar', length: 20, unique: true, nullable: false })
  username: string;
  @Column({ type: 'varchar', length: 255, nullable: false }) //hashed
  password: string;
  @Column({ type: 'varchar', length: 255, nullable: true })
  avatar: string;
  @Column({ type: 'varchar', length: 255, nullable: true })
  name: string;
  @Column({ type: 'varchar', length: 255, unique: true, nullable: true })
  email: string;
  @Column({ type: 'varchar', length: 255, nullable: true })
  phone: string;
  @Column({ type: 'date', nullable: true })
  birthdate: Date;
  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;
  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}
