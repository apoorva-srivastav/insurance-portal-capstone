import { NestFactory } from '@nestjs/core';
import { PolicyModule } from './policy.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  // const app = await NestFactory.create(PolicyModule);
  
  // await app.listen(3001);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    PolicyModule,
    {
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 3001,
      },
    },
  );
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useLogger(app.get(Logger));
  await app.listen();
}
bootstrap();
