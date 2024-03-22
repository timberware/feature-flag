import { ArgumentsHost, Catch, HttpStatus, Logger } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Response } from 'express';
import { MongoError } from 'mongodb';

@Catch(MongoError)
export class MongoExceptionFilter extends BaseExceptionFilter {
  private readonly logger = new Logger(MongoExceptionFilter.name);

  catch(exception: MongoError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status;
    switch (exception.code) {
      case 11000: {
        status = HttpStatus.BAD_REQUEST;
        response.status(status).json({
          statusCode: HttpStatus.BAD_REQUEST,
          message: exception.message,
        });

        break;
      }
      default: {
        super.catch(exception, host);

        break;
      }
    }
  }
}
