import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

interface ClassConstructor {
  new (...args: any[]): {};
}

// from https://gist.github.com/ibayazit/dee57afc274297490e7265bcf4da63ab
export function PlainToClass(dto: ClassConstructor) {
  return UseInterceptors(new PlainToClassInterceptor(dto));
}

export class PlainToClassInterceptor implements NestInterceptor {
  constructor(private dto: ClassConstructor) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data: ClassConstructor) => {
        return plainToClass(this.dto, data);
      }),
    );
  }
}
