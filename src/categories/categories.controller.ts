import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { PlainToInstance } from '../utils/interceptors/PlainToInstance.interceptor';
import { CategoryDataDto } from './dto/category-data.dto';

@Controller('categories')
@PlainToInstance(CategoryDataDto)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async getCategories() {
    return await this.categoriesService.findAll();
  }

  @Get('/arranged')
  async getArrangedCategories() {
    return await this.categoriesService.arrange();
  }
}
