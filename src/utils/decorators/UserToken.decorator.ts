import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserTokenDto } from '../dto/user-token.dto';

/**
 * Custom decorator to extract user token data from the request.
 *
 * @param {keyof UserTokenDto | undefined} key - The specific key to retrieve from the user token.
 * If omitted, returns the entire `UserTokenDto` object.
 * @returns {string | number | UserTokenDto} The requested user token property or the full user object.
 * @see {@link UserTokenDto}
 * @example
 * ```ts
 * @Get()
 * getUser(@UserToken("id") userId: string) {
 *   return `User ID: ${userId}`;
 * }
 * ```
 *
 * @example
 * ```ts
 * @Get()
 * getFullUser(@UserToken() user: UserTokenDto) {
 *   return user;
 * }
 * ```
 */
export const UserToken = createParamDecorator<keyof UserTokenDto | undefined>(
  (key, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    return key && request.user ? request.user[key] : request.user;
  },
);
