import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { LoggerModule } from '../../libs/common/src/logger/logger.module';

import { HealthCheckModule } from './health-check/health-check.module'
import { OrganizationsModule } from './organizations/organizations.module'

@Module({
  imports: [
  ConfigModule.forRoot(),
    LoggerModule,
    HealthCheckModule,
    OrganizationsModule
  ]
})
export class AppModule {}
