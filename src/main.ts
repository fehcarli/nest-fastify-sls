import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import fastifyCsrf from '@fastify/csrf-protection';
import helmet from '@fastify/helmet'
import { AppModule } from './app.module';

async function bootstrap() {
  const api = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      cors: true,
      snapshot: true
    }
  );

  await api.register(fastifyCsrf);
  await api.register(helmet)

  const port = 3000;
  await api.listen(port, '0.0.0.0');
}
bootstrap();
