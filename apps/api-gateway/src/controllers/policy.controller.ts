import { Body, Controller, Get, Inject, Post, UseGuards, Query, HttpCode, HttpStatus } from '@nestjs/common';

import { ThrottlerGuard } from '@nestjs/throttler';
import { ClientProxy } from '@nestjs/microservices';
import { Role, Roles } from '../decorators/roles.decorator';
import { AuthGuard } from '../gaurds/auth.guard';
import { RolesGuard } from '../gaurds/role.gaurd';
import { Authorization } from '../decorators/authorization.decorator';
import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { policyDto } from '../dto/policy.dto';
import { firstValueFrom } from 'rxjs';

@ApiTags('policy')
@ApiBearerAuth()
@Controller()
export class PolicyController {
  constructor(
    @Inject('POLICY_SERVICE') private readonly policyServiceClient: ClientProxy,) {}

  @HttpCode(HttpStatus.OK)
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Authorization(true)
  @ApiResponse({ type: policyDto })
  @Post('add-policy')
  async addNewPolicy(@Body() body: policyDto): Promise<policyDto> {
    return await firstValueFrom(this.policyServiceClient.send('add_new_policy', body));
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(ThrottlerGuard)
  @ApiResponse({ type: policyDto, isArray: true })
  @Get('all-policies')
  async getPolicies(): Promise<policyDto[]> {
    return await firstValueFrom(this.policyServiceClient.send('get_all_policies', {}));
  }

  @HttpCode(HttpStatus.OK)
  @ApiQuery({ type: policyDto })
  @ApiResponse({ type: policyDto,  isArray: true })
  @Get('search-policies')
  async getFilteredPolicies(@Query() query: Partial<policyDto>): Promise<policyDto[]> {
    return await firstValueFrom(this.policyServiceClient.send('search_policy', query));
  }
  
}
