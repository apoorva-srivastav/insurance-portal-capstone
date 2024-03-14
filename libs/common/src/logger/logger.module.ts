import { Module } from '@nestjs/common';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
@Module({
  imports: [
    PinoLoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async () => {
        return {
          colorize: true,
          pinoHttp: {
            genReqId: (request) => request.headers['x-correlation-id'] || uuidv4(),
            options: {
              singleLine: true,
            },
          }}}
        }),
  ],
})
export class LoggerModule {}
