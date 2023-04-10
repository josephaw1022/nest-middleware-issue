import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';
import { AppModule } from './app.module';

describe('HealthController', () => {
  let controller: HealthController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    controller = app.get<HealthController>(HealthController);
  });

  describe('the health endpoint', () => {
    it('should return {status:"ok"}', () => {
      expect(controller.getStatus()).toEqual({ status: 'ok' });
    });
  });
});
