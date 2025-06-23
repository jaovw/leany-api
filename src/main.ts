import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,              // [joaovictor - 23/06/2025] remove campos não mapeados no DTO
    forbidNonWhitelisted: true,   // [joaovictor - 23/06/2025] lança erro se enviar campo a mais
    transform: true,              // [joaovictor - 23/06/2025] transforma para os tipos corretos
  }));
  await app.listen(3000);
}
bootstrap();
