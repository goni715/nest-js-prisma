/* eslint-disable @typescript-eslint/no-floating-promises */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception/http-exception.filter';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.useGlobalFilters(new HttpExceptionFilter());
  // app.useGlobalPipes(new ValidationPipe()); //valiadtion
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      exceptionFactory: (errors) => {
        const formattedErrors: Record<string, string> = {};

        errors.forEach((error) => {
          if (error.constraints) {
            formattedErrors[error.property] = Object.values(
              error.constraints,
            )[0];
          }
        });

        return new BadRequestException({
          success: false,
          message: Object.values(formattedErrors)[0],
          error: formattedErrors,
        });
      },
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
