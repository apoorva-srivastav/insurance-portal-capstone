import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { PolicyService } from './policy.service';
import { MessagePattern } from '@nestjs/microservices';
import { IPolicy } from './interface/policy.interface';

@Controller('policy')
export class PolicyController {
  constructor(private readonly policyService: PolicyService) {}

  @MessagePattern('get_all_policies')
  @Get()
  getAllPolicies() {
    return this.policyService.findAll();
  }

  @MessagePattern('search_policy')
  @Get('search')
  getFilteredPolicies(@Body() body) {
    return this.policyService.filterPolicy(body);
  }

  @MessagePattern('add_new_policy')
  @Post('addNew')
  addNewPolicy(@Body() body) {
    return this.policyService.addPolicy(body);
  }

  //@Roles(Role.Admin)
  //@UseGuards( RolesGuard )
  @MessagePattern('update_policy')
  @Post('update')
  updatePolicy(@Body() body) {
    return this.policyService.updatePolicy(body);
  }
}
