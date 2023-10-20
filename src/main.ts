import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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
