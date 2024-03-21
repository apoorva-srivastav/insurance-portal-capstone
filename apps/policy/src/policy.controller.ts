import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { PolicyService } from './policy.service';
import { MessagePattern } from '@nestjs/microservices';
import { IPolicy } from './interface/policy.interface';

@Controller('policy')
export class PolicyController {
  constructor(private readonly policyService: PolicyService) {}

  @MessagePattern('get_all_policies')
  @Get()
  getAllPolicies(): Promise<IPolicy[]> {
    return this.policyService.findAll();
  }

  @MessagePattern('search_policy')
  getFilteredPolicies(@Body() body): Promise<IPolicy> {
    return this.policyService.filterPolicy(body);
  }

  @MessagePattern('add_new_policy')
  addNewPolicy(@Body() body: IPolicy): Promise<IPolicy> {
    return this.policyService.addPolicy(body);
  }

  @MessagePattern('update_policy')
  @Post('update')
  updatePolicy(@Body() body: IPolicy): Promise<IPolicy> {
    return this.policyService.updatePolicy(body);
  }
}
