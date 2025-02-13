import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToInstance } from 'class-transformer';
import { MetaDataDto } from '../dto/meta-data.dto';

// from https://gist.github.com/ibayazit/dee57afc274297490e7265bcf4da63ab
export function PlainToInstance(dto: ClassConstructor) {
  return UseInterceptors(new PlainToInstanceInterceptor(dto));
}

export class PlainToInstanceInterceptor implements NestInterceptor {
  constructor(private dto: ClassConstructor) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data: Object) => {
        if (
          data.hasOwnProperty('data') &&
          'data' in data &&
          data.hasOwnProperty('meta') &&
          'meta' in data
        ) {
          return {
            data: plainToInstance(this.dto, data.data),
            meta: plainToInstance(MetaDataDto, data.meta),
          };
        } else {
          return plainToInstance(this.dto, data);
        }
      }),
    );
  }
}
