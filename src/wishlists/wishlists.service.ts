import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Wishlist } from './wishlist.entity';
import { WishlistQueryDto } from './dto/wishlist-query.dto';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private readonly wishlistRepository: Repository<Wishlist>,
  ) {}

  // add to wishlist
  async create(userId: string, wishlist: CreateWishlistDto) {
    const payload = {
      ...wishlist,
      user_id: userId,
    };

    await this.wishlistRepository.save(payload);
  }

  async findOneById(id: string) {
    return await this.wishlistRepository.findOneBy({ id });
  }

  async findAllByUserId(id: string, wishlistQueryDto: WishlistQueryDto) {
    const [data, count] = await this.wishlistRepository.findAndCount({
      where: { user_id: id },
      take: wishlistQueryDto.limit,
      skip: wishlistQueryDto.skip,
      order: {
        [wishlistQueryDto.order_by]: wishlistQueryDto.order,
      },
      relations: ['product'],
    });

    const meta = wishlistQueryDto.getMetadata(count);
    return { data, meta };
  }

  async deleteById(userId: string, id: string) {
    return await this.wishlistRepository.delete({ user_id: userId, id: id });
  }
}
