import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { PolicyService } from './policy.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('policy')
export class PolicyController {
  constructor(private readonly policyService: PolicyService) {}


  @MessagePattern('get_all_policies')
  getAllPolicies() {
    return this.policyService.findAll();
  }

  @MessagePattern('search_policy')
  @Post('search')
  getFilteredPolicies(@Body() body: Record<string, any>) {
    return this.policyService.filterPolicy(body);
  }

  //@Roles(Role.Admin)
  //@UseGuards( RolesGuard )
  @MessagePattern('add_new_policy')
  @Post('addNew')
  addNewPolicy(@Body() body: Record<string, any>) {
    return this.policyService.addPolicy(body);
  }

  //@Roles(Role.Admin)
  //@UseGuards( RolesGuard )
  @MessagePattern('update_policy')
  @Post('update')
  updatePolicy(@Body() body: Record<string, any>) {
    return this.policyService.updatePolicy(body);
  }
}
