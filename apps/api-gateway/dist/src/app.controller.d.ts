import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';
import { User } from './dto/user.entity';
export declare class AppController {
    private readonly appService;
    private readonly userServiceClient;
    private readonly authServiceClient;
    constructor(appService: AppService, userServiceClient: ClientProxy, authServiceClient: ClientProxy);
    login(signInDto: User): Promise<import("rxjs").Observable<any>>;
    signIn(signInDto: User): import("rxjs").Observable<any>;
}
