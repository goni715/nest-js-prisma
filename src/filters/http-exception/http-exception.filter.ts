/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    // Handle Route Not Found
    if (exception instanceof NotFoundException) {
      const exceptionResponse = exception.getResponse();

      const message =
        typeof exceptionResponse === 'string'
          ? exceptionResponse
          : exceptionResponse['message'];

      // Route not found
      if (typeof message === 'string' && message.startsWith('Cannot ')) {
        return response.status(HttpStatus.NOT_FOUND).json({
          success: false,
          message: 'Route Not Found',
          error: {
            path: request.originalUrl,
            method: request.method,
          },
        });
      }

      // Normal NotFoundException from service
      return response.status(HttpStatus.NOT_FOUND).json({
        success: false,
        message,
      });
    }

    if (exception instanceof HttpException) {
      return response.status(exception.getStatus()).json(exceptionResponse);
    }

    return response.status(status).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
}
