import { IsNotEmpty, IsString } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class AuthTokenDto {
  @IsNotEmpty()
  @IsString()
  @Expose()
  access_token: string;
}
