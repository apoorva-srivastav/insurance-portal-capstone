import { Controller, Get } from '@nestjs/common';
import { PolicyService } from './policy.service';

@Controller('policy')
export class PolicyController {
  constructor(private readonly policyService: PolicyService) {}

  @Get()
  getHello(): string {
    return this.policyService.getHello();
  }
}
