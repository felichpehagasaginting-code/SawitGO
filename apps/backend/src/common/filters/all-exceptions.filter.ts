import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse =
      exception instanceof HttpException ? exception.getResponse() : null;

    let message = 'Terjadi kesalahan pada server internal.';
    let errorCode = 'ERR_INTERNAL_SERVER';
    let errorDetails: unknown = null;

    if (typeof exceptionResponse === 'string') {
      message = exceptionResponse;
    } else if (
      typeof exceptionResponse === 'object' &&
      exceptionResponse !== null
    ) {
      const resObj = exceptionResponse as {
        message?: string;
        errorCode?: string;
        errorDetails?: unknown;
      };
      message = resObj.message || message;
      errorCode =
        resObj.errorCode ||
        (status === 409 ? 'ERR_CONFLICT_STALE_SCORE' : errorCode);
      errorDetails = resObj.errorDetails || null;
    }

    response.status(status).json({
      success: false,
      statusCode: status,
      errorCode,
      message,
      errorDetails,
      meta: {
        requestId: `req-${Date.now()}`,
        timestamp: Date.now(),
      },
    });
  }
}
