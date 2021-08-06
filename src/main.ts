import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Notes API')
    .setDescription('Simple REST API for personal notes management')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const swaggerDoc = SwaggerModule.createDocument(app, swaggerConfig);

  const swaggerOptions: SwaggerCustomOptions = {
    customSiteTitle: 'Notes API Docs',
  };

  SwaggerModule.setup('api-docs', app, swaggerDoc, swaggerOptions);

  await app.listen(3000);
}
bootstrap();
