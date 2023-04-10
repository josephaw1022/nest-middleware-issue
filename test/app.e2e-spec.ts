import { Test, TestingModule } from '@nestjs/testing';
import {
  INestApplication,
  MiddlewareConsumer,
  Module,
  RequestMethod,
} from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { AppService } from './../src/app.service';
import { HealthController } from './../src/health.controller';

describe('AppController (e2e)', () => {
  let middlewareHasRunCount = 0;

  class TestingOutMiddleware {
    use(req, res, next) {
      middlewareHasRunCount++;
      next();
    }
  }

  @Module({
    imports: [],
    controllers: [HealthController],
    providers: [AppService],
  })
  class TestingAppModule {
    configure(consumer: MiddlewareConsumer) {
      consumer
        .apply(TestingOutMiddleware)
        .exclude({
          path: 'health/',
          method: RequestMethod.GET,
        })
        .forRoutes('*');
    }
  }

  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TestingAppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();
  });

  afterEach(async () => {
    await jest.clearAllMocks();
    await app.close();
    middlewareHasRunCount = 0;
  });

  it('/heath should not run midleware', async () => {
    // Make sure the request is made
    await request(app.getHttpServer())
      .get('/health')
      .expect(200)
      .expect({ status: 'ok' });

    // This is the problem, the middleware is not called
    expect(middlewareHasRunCount).toBe(0);
  });

  it('/health/ should not run midleware', () => {
    // Make sure the request is made
    request(app.getHttpServer())
      .get('/health/')
      .expect(200)
      .expect({ status: 'ok' });

    // This is the problem, the middleware is not called
    expect(middlewareHasRunCount).toBe(0);
  });
});
