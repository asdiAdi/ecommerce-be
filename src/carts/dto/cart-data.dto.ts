import { IsDate, IsNotEmpty, IsUUID } from 'class-validator';
import { Exclude } from 'class-transformer';

export class CartDataDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsUUID()
  user_id?: string;

  @Exclude()
  @IsDate()
  created_at: Date;
  @Exclude()
  @IsDate()
  updated_at: Date;
}
