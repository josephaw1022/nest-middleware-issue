import { Test, TestingModule } from '@nestjs/testing';
import {
  INestApplication,
  MiddlewareConsumer,
  Module,
  RequestMethod,
} from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { AppMiddleWare } from './../src/app.middleware';
import { AppService } from './../src/app.service';
import { HealthController } from './../src/health.controller';

@Module({
  imports: [],
  controllers: [HealthController],
  providers: [AppService],
})
export class TestingAppModule {
  
}

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let middlewareReference: AppMiddleWare;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TestingAppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();
  });

  afterEach(async () => {
    await jest.clearAllMocks();
  });

  it('/heath should not run midleware', async () => {
    await request(app.getHttpServer())
      .get('health')
      .expect(200)
      .expect({ status: 'ok' });
  });

  it('/health/ should not run midleware', () => {
    request(app.getHttpServer())
      .get('health/')
      .expect(200)
      .expect({ status: 'ok' });
  });
});
