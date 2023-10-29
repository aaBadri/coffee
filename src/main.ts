import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './common/filters/http-exception/http-exception.filter';
import { WrapResponseInterceptor } from './common/interceptors/wrap-response/wrap-response.interceptor';
import { TimeoutInterceptor } from './common/interceptors/timeout/timeout.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      // global @Type(() => Number)
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(
    // new WrapResponseInterceptor(),
    new TimeoutInterceptor(),
  );
  const options = new DocumentBuilder()
    .setTitle('Coffees app')
    .setDescription('a description for coffees app')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  // api_doc is the route path for swagger ui
  SwaggerModule.setup('api_doc', app, document);
  await app.listen(3000);
}
bootstrap();
