import { Body, Controller, Get, Post } from '@nestjs/common';
import { PolicyService } from './policy.service';

@Controller('policy')
export class PolicyController {
  constructor(private readonly policyService: PolicyService) {}

  @Get()
  getAllPolicies() {
    return this.policyService.findAll();
  }

  @Post('search')
  getFilteredPolicies(@Body() body: Record<string, any>) {
    const {policyType, coverage} = body;
    return this.policyService.filterPolicy(body);
  }
}
