import { NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
export declare class AppMiddleWare implements NestMiddleware {
    use(req: Request, res: Response, next: CallableFunction): void;
}
