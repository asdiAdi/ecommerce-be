import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { NODE_ENV } from '../../config';

@Injectable()
export class CookieMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const originalCookie = res.cookie.bind(res);

    res.cookie = (name, value: any, options: any = {}) => {
      const defaultOptions = {
        signed: true,
        httpOnly: true,
        secure: NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000, // Default to 30 days
      };

      return originalCookie(name, value, { ...defaultOptions, ...options });
    };

    next();
  }
}
