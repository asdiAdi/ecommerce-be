import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { getValidationErrorResponse } from './utils/setup';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
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
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
