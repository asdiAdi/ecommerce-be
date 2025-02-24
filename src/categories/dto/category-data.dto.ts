import { IsDate, IsString, IsUUID } from 'class-validator';
import { Exclude } from 'class-transformer';

export class CategoryDataDto {
  @IsUUID()
  id: string;

  @IsString()
  parent_id: string;

  @IsString()
  name: string;

  @Exclude()
  @IsDate()
  created_at: Date;

  @Exclude()
  @IsDate()
  updated_at: Date;
}
