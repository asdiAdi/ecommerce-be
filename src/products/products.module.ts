import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product } from './product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../utils/entity/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
