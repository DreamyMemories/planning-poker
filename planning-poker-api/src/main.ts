import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const cors = {
  origin: true,
};
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: cors,
    rawBody: true,
  });
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  const swaggerConfig = new DocumentBuilder()
    .setTitle(' Planning Poker API')
    .setDescription('Api definitions for  Planning Poker')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(3002);
}
bootstrap();
