import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { HealthController } from './health.controller';
import { AppService } from './app.service';
import { AppMiddleWare } from './app.middleware';

@Module({
  imports: [],
  controllers: [HealthController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AppMiddleWare)
      .exclude({
        path: 'health/',
        method: RequestMethod.GET,
      })
      .forRoutes('*');
  }
}
