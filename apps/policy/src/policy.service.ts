import { Injectable } from '@nestjs/common';

@Injectable()
export class PolicyService {
  getHello(): string {
    return 'Hello World! new CI/CD pipeline';
  }
}
