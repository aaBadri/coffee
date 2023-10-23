import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ApiKeyGuard } from './guards/api-key/api-key.guard';
import * as Joi from '@hapi/joi';
import commonConfig from './config/common.config';

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
    {
      provide: APP_GUARD,
      useClass: ApiKeyGuard,
    },
  ],
})
export class CommonModule {}
