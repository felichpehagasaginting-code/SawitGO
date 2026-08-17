import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from 'express';

export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message?: string;
  data: T;
  meta: {
    requestId: string;
    timestamp: number;
  };
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<
  T,
  ApiResponse<T>
> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponse<T>> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse<Response>();
    const statusCode = response.statusCode;

    return next.handle().pipe(
      map((data: T): ApiResponse<T> => {
        const envelope = data as { message?: string; data?: T } | null;
        return {
          success: true,
          statusCode,
          message: envelope?.message || 'Operasi berhasil diproses.',
          data: envelope?.data !== undefined ? envelope.data : data,
          meta: {
            requestId: `req-${Date.now()}`,
            timestamp: Date.now(),
          },
        };
      }),
    );
  }
}
