import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.time('Request-Response Time');
    console.log('middleware is logging!');
    // this calculation will include the Interceptors, Filters, Guards, method handlers etc of this route.
    res.on('finish', () => console.timeEnd('Request-Response Time'));
    next();
  }
}
