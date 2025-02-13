import { IsNumber, IsString } from 'class-validator';

/**
 * DTO for user authentication tokens.
 */
export class UserTokenDto {
  /**
   * The unique user identifier.
   * @type {string}
   */
  @IsString()
  id: string;

  /**
   * The username associated with the token.
   * @type {string}
   */
  @IsString()
  username: string;

  /**
   * Issued-at timestamp (Unix time).
   * @type {number}
   */
  @IsNumber()
  iat: number;

  /**
   * Expiration timestamp (Unix time).
   * @type {number}
   */
  @IsNumber()
  exp: number;
}
