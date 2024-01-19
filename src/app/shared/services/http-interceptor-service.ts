import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, EMPTY, map, Observable, throwError } from 'rxjs';


//import { AuthService } from 'src/app/auth/auth.service';
//import { CommonService } from './common.service';

@Injectable()
export class HttpInteceptorService implements HttpInterceptor {
  constructor(
    private router: Router,
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      map((res: any) => {
        return res;
      }),
      catchError((error: HttpErrorResponse) => {
        let errorMsg = '';
        let message = error.error.message ? error.error.message : error.message;
        if (error.error instanceof ErrorEvent) {
          errorMsg = `Error: ${message}`;
          return throwError(errorMsg);
        }
        switch (error.status) {
          case 400:
            /// Bad Request
            errorMsg = message;
            break;

          case 401:
            /// Not Authorized
            
            // this.authService.logout();
            return EMPTY;

          case 403:
            /// Access Denied
            //this.commonService.showErrorToaster(`Error`, `${message}`);
            //this.router.navigate(['/pages']);
            return EMPTY;

          case 500:
            /// Internal server error
            errorMsg = error.message;
            break;
        }
        return throwError(errorMsg);
      })
    );
  }
}
