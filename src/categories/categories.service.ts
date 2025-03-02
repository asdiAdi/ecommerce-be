import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { IsNull, Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async findAll() {
    return await this.categoryRepository.find();
  }

  private async buildCategories(category: Category[]) {
    for (let i = 0; i < category.length; i++) {
      const sub = await this.categoryRepository.findBy({
        parent_id: category[i].id,
      });
      if (sub.length > 0) {
        category[i].subcategories = sub;
        await this.buildCategories(category[i].subcategories);
      }
    }

    return category;
  }

  async arrange() {
    const parentCategories = await this.categoryRepository.findBy({
      parent_id: IsNull(),
    });

    // for (let i = 0; i < parentCategories.length; i++) {
    //   parentCategories[i].subcategories = await this.categoryRepository.findBy({
    //     parent_id: parentCategories[i].id,
    //   });
    // }

    return this.buildCategories(parentCategories);
    // return await this.categoryRepository.find({
    //   relations: [
    //     'subcategories',
    //     'subcategories.subcategories',
    //     'subcategories.subcategories.subcategories',
    //   ],
    // });
  }
}
