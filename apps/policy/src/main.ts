import { NestFactory } from '@nestjs/core';
import { PolicyModule } from './policy.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(PolicyModule);
  await app.listen(3001);

  // const app = await NestFactory.createMicroservice<MicroserviceOptions>(
  //   PolicyModule,
  //   {
  //     transport: Transport.TCP,
  //     options: {
  //       port: 3001,
  //     },
  //   },
  // );
  // await app.listen();
}
bootstrap();
