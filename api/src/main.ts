import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import AppModule from './app.module';
import { MongoExceptionFilter } from './mongo/mongoErrorHandler';
import { MongooseExceptionFilter } from './mongo/mongooseErrorHandler';

async function bootstrap() {
  const logger = new Logger('main.ts');
  const app = await NestFactory.create(AppModule, { cors: true });
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new MongoExceptionFilter(httpAdapter));
  app.useGlobalFilters(new MongooseExceptionFilter(httpAdapter));

  const configService = app.get(ConfigService);
  const port = configService.get('PORT');

  await app.listen(port);
  logger.log(`App started on port ${port}`);
}
bootstrap();
