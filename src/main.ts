import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { getValidationErrorResponse } from './utils/setup';
import { COOKIE_SECRET } from './config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cookieParser(COOKIE_SECRET));
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        const errors = getValidationErrorResponse(validationErrors);
        return new BadRequestException({
          message: 'validation error',
          errors: errors,
        });
      },
    }),
  );
  await app.listen(process.env.PORT ?? 4000);
}
void bootstrap();
