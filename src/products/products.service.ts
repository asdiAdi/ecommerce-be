import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { In, Repository } from 'typeorm';
import { ProductQueryDto } from './dto/product-query.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async findByAsin(asin: string) {
    return await this.productRepository.findOneBy({ asin: asin });
  }

  async findByAsins(asin: string[]) {
    return await this.productRepository.findBy({ asin: In(asin) });
  }

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

  async reduceStock(asin: string, quantity: number) {
    const product = await this.findByAsin(asin);
    if (!product) throw new NotFoundException('Product not found');

    if (quantity > product.stock)
      throw new ForbiddenException('Exceeded max quantity reduction');

    const { affected } = await this.productRepository.update(
      { asin },
      { stock: product.stock - quantity },
    );

    if (affected) {
      return true;
    } else {
      throw new NotFoundException('Product not found');
    }
  }
}
