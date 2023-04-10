import { AppService } from './app.service';
export declare class HealthController {
    private readonly appService;
    constructor(appService: AppService);
    getStatus(): {
        status: "ok";
    };
}
