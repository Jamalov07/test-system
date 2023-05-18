import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { AllExceptionsFilter } from './errors/all-exceptions.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { InternalServerErrorException, ValidationPipe } from '@nestjs/common';

const start = async () => {
  try {
    const PORT = process.env.PORT || 3333;
    const app = await NestFactory.create(AppModule);
    const adapterHost = app.get(HttpAdapterHost);
    app.useGlobalFilters(new AllExceptionsFilter(adapterHost));
    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe());
    const config = new DocumentBuilder()
      .setTitle('TEST')
      .setDescription('test system')
      .setVersion('1.0.0')
      .addTag('NodeJS, NestJS, PostgreSQL, Sequelize')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/docs', app, document);

    await app.listen(PORT, () => {
      console.log(`Server ${PORT} - portda ishga tushdi`);
    });
  } catch (error) {
    console.log(error);
    throw new InternalServerErrorException(error);
  }
};

start();
