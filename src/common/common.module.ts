import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// import { APP_GUARD } from '@nestjs/core';
// import { ApiKeyGuard } from './guards/api-key/api-key.guard';
import * as Joi from '@hapi/joi';
import commonConfig from './config/common.config';
import { LoggingMiddleware } from './middleware/logging/logging.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [commonConfig],
      validationSchema: Joi.object({
        API_KEY: Joi.required(),
      }),
    }),
  ],
  providers: [
    // {
    //   provide: APP_GUARD,
    //   useClass: ApiKeyGuard,
    // },
  ],
})
export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggingMiddleware).forRoutes('*');
    consumer
      .apply(LoggingMiddleware)
      .exclude()
      .forRoutes({ path: 'coffees/*', method: RequestMethod.GET });
  }
}
