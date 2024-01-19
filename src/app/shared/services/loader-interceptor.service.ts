import { finalize } from 'rxjs/operators';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonService } from './common.service';

@Injectable()
export class LoaderInterceptorService implements HttpInterceptor {
  service_count = 0; // initialize the counter.

  constructor(private commonservice: CommonService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.service_count++; // increment the count for each intercepted http request.

    /**
     * show loader when api call
     */
    this.commonservice.showLoader();

    return next.handle(req).pipe(
      finalize(() => {
        this.service_count--; // decrement the count for each intercepted http response.
        if (this.service_count === 0) {
          /**
           * hide loader when api response come
           */
          this.commonservice.hideLoader();
        }
      })
    );
  }
}
