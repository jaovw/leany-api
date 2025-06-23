import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,              // [joaovictor - 23/06/2025] remove campos não mapeados no DTO
    forbidNonWhitelisted: true,   // [joaovictor - 23/06/2025] lança erro se enviar campo a mais
    transform: true,              // [joaovictor - 23/06/2025] transforma para os tipos corretos
  }));

  // [joaovictor - 23/06/2025]  Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('PokéTeam API')
    .setDescription('API para gerenciar treinadores, times e pokémons com integração à PokéAPI')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);      // [joaovictor - 23/06/2025] http://localhost:3000/api

  await app.listen(3000);
}
bootstrap();
