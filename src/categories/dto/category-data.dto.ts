import { IsDate, IsString, IsUUID } from 'class-validator';
import { Exclude, Type } from 'class-transformer';

export class CategoryDataDto {
  @IsUUID()
  id: string;

  @Exclude()
  @IsString()
  parent_id: string | null;

  @IsString()
  name: string;

  @Exclude()
  @IsDate()
  created_at: Date;

  @Exclude()
  @IsDate()
  updated_at: Date;

  @Type(() => CategoryDataDto)
  subcategories: CategoryDataDto[];
}
