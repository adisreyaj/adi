import {
  ForbiddenException,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';
import { catchError, Observable, throwError } from 'rxjs';

export const enum AuthxError {
  InvalidPassword = 'InvalidPassword',
}

/**
 * A map of `AuthxError` to its corresponding `HttpException`.
 */
export const AuthxErrorToExceptionMap = new Map<AuthxError, HttpException>([
  [AuthxError.InvalidPassword, new ForbiddenException('Invalid password')],
]);

export class AuthxException<T = object> {
  errorType: AuthxError;
  message: string;
  metadata: T;

  constructor({
    errorType,
    message,
    metadata = undefined,
  }: {
    errorType: AuthxError;
    message: string;
    metadata?: T;
  }) {
    this.errorType = errorType;
    this.message = message;
    this.metadata = metadata;
  }
}

export class InvalidPasswordAuthxException extends AuthxException {
  constructor() {
    super({
      errorType: AuthxError.InvalidPassword,
      message: 'Invalid password!',
    });
  }
}

/**
 * Convert exceptions thrown by the Authx GRPC service into
 * `HttpException` that can be handled by the NestJS framework.
 */
export function handlerAuthxException() {
  return (source: Observable<unknown>) =>
    source.pipe(
      catchError((err) => {
        const error = JSON.parse(err?.details ?? {});
        if (error) {
          const exception = AuthxErrorToExceptionMap.get(error.errorType);
          if (exception) {
            return throwError(() => exception);
          }
        }
        return throwError(
          () => new InternalServerErrorException('Something Went Wrong!')
        );
      })
    );
}
