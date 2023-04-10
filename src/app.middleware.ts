import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class AppMiddleWare implements NestMiddleware {
  use(req: Request, res: Response, next: CallableFunction) {
    console.log('Middleware Before');
    next();
    console.log('Middleware After');
  }
}
