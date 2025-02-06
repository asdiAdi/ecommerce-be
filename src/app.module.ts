import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  NODE_ENV,
  PGDATABASE,
  PGHOST,
  PGPASSWORD,
  PGPORT,
  PGUSER,
} from './config';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: PGHOST,
      port: PGPORT,
      username: PGUSER,
      password: PGPASSWORD,
      database: PGDATABASE,
      synchronize: NODE_ENV === 'development',
      autoLoadEntities: true,
    }),
  ],
})
export class AppModule {}
