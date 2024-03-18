import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppService } from './app.service';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './gaurds/auth.guard';
import { PolicyController } from './controllers/policy.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 3000,
        },
      },
      {
        name: 'USER_SERVICE',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 3002,
        },
      },
      {
        name: 'POLICY_SERVICE',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 3001,
        },
      },
    ]),
    ThrottlerModule.forRoot([{
      ttl: 5,
      limit: 2,
      // store: {
      //   type: 'redis',
      //   client: redisClient,
      // },
    }])
  ],
  controllers: [AppController, PolicyController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    }],
})
export class AppModule {}
