import { AuthxException } from '@adi/authx/config';
import { Catch, ExceptionFilter } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';

@Catch()
export class AuthxExceptionsFilter implements ExceptionFilter {
  catch(exception: AuthxException): Observable<unknown> {
    return throwError(() => new Error(JSON.stringify(exception)));
  }
}
