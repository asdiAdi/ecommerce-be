import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Cookie = createParamDecorator(
  (cookieName: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return cookieName
      ? request.signedCookies?.[cookieName]
      : request.signedCookies;
  },
);
