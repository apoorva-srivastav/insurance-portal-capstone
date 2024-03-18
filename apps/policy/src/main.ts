import { NestFactory } from '@nestjs/core';
import { PolicyModule } from './policy.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

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
  await app.listen();
}
bootstrap();
