import { Body, Controller, Get, Param, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { PlainToInstance } from '../utils/interceptors/PlainToInstance.interceptor';
import { ProductDataDto } from './dto/product-data.dto';
import { ProductQueryDto } from './dto/product-query.dto';

// TODO: Admin usage
@PlainToInstance(ProductDataDto)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getAllProducts(@Query() productQueryDto: ProductQueryDto) {
    return await this.productsService.findAll(productQueryDto);
  }

  @Get('/:asin')
  async getProduct(@Param('asin') asin: string) {
    return await this.productsService.findByAsin(asin);
  }
}
