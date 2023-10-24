import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class WrapResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // console.log('WrapResponseInterceptor: Before response');
    // console.log the exact data that we are returning in the response
    // return next.handle().pipe(tap((data) => console.log('After...', data)));
    // wrap the response in data key: {data: response}
    return next.handle().pipe(map((data) => ({ data })));
  }
}
