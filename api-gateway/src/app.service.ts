import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs/operators';

@Injectable()
export class AppService {
  constructor(
    @Inject('POLICY_SERVICE') private readonly clientServiceB: ClientProxy,
  ) {}


  pingServiceA() {
    const pattern = { cmd: 'getAll' };
    const payload = {};
    return this.clientServiceB
      .send<string>(pattern, payload)
      .pipe(
        map((message: string) => (message)),
      );
  }

  
}
