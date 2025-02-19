import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { ProductQueryDto } from './dto/product-query.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async findAll(productQuery: ProductQueryDto) {
    const [data, count] = await this.productRepository.findAndCount({
      where: productQuery.queries,
      take: productQuery.limit,
      skip: productQuery.skip,
      order: {
        [productQuery.order_by]: productQuery.order,
      },
    });

    const meta = productQuery.getMetadata(count);
    return { data, meta };
  }

  async findByAsin(asin: string) {
    return await this.productRepository.findOneBy({ asin: asin });
  }
}
