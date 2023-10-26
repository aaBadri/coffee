import 'jest';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { CoffeesModule } from 'src/coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { CreateCoffeeDto } from 'src/coffees/dto/create-coffee.dto';

dotenv.config();

describe('[Feature] Coffees - /coffees', () => {
  const coffee = {
    name: 'Coffee1',
    brand: 'Brand1',
    flavors: ['chocolate', 'vanilla'],
  };
  let app: INestApplication;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        CoffeesModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: process.env.DATABASE_HOST,
          port: +process.env.TEST_DATABASE_PORT,
          username: process.env.DATABASE_USERNAME,
          password: process.env.DATABASE_PASSWORD,
          database: process.env.TEST_DATABASE_NAME,
          autoLoadEntities: true,
          synchronize: true,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
        transformOptions: { enableImplicitConversion: true },
      }),
    );
    await app.init();
  });
  // can use todo to track tests that need to be implemented
  it('Create [POST /]', () => {
    return request(app.getHttpServer())
      .post('/coffees')
      .send(coffee as CreateCoffeeDto)
      .expect(HttpStatus.CREATED)
      .then(({ body }) => {
        expect(body).toEqual(
          expect.objectContaining({
            ...coffee,
            flavors: expect.arrayContaining(
              coffee.flavors.map((name) => expect.objectContaining({ name })),
            ),
          }),
        );
      });
  });

  //   it('Get all [GET /]', () => {
  //     return request(app.getHttpServer())
  //       .get('/coffees')
  //       .send(coffee as CreateCoffeeDto)
  //       .expect(HttpStatus.OK);
  //   });

  // it('Get one [GET /:id]', () => {
  //   return request(app.getHttpServer())
  //     .get('/coffees/1')
  //     .expect(HttpStatus.OK)
  //     .then(({ body }) => {
  //       const expectedCoffee = jasmine.objectContaining({
  //         ...coffee,
  //         flavors: jasmine.arrayContaining(
  //           coffee.flavors.map(name => jasmine.objectContaining({ name })),
  //         ),
  //       });
  //
  //       expect(body).toEqual(expectedCoffee);
  //     });
  // });

  it.todo('Get all [GET /]');
  it.todo('Get one [GET /:id]');
  it.todo('Update one [PATCH /:id]');
  it.todo('Delete one [DELETE /:id]');

  afterAll(async () => {
    await app.close();
  });
});
