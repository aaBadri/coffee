import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import appConfig from './config/app.config';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [
    // if this is synchronous we do not have values for config values so we should run async
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.localhost,
        port: +process.env.DATABASE_PORT,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        autoLoadEntities: true,
        // turn off in production
        // synchronize: true,
      }),
    }),
    ConfigModule.forRoot({
      load: [appConfig],
      validationSchema: Joi.object({
        DATABASE_HOST: Joi.required(),
        DATABASE_PORT: Joi.number().default(5432),
      }),
      // add more .env files, first occurness of a variable in multiple files is final one
      // envFilePath: ['.env', '.environment'],
      // not env file
      // ignoreEnvFile: true,
    }),
    CoffeesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // across all module
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
