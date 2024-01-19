import {  HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators'
import { environment } from '../../../Enviornment/enviornment'

@Injectable({ providedIn: 'root' })
export class ApiInterfaceServices {

  constructor(
    private http: HttpClient
  ) {
  }


  get(url: string, params?: any): Observable<any> {
    let queryStr = '';
    if (params) {
      Object.keys(params).forEach(key => {
        if (!params[key]) {
          delete params[key];
        }
      });
      const httpParams = new HttpParams({
        fromObject: params
      });
      queryStr = httpParams.toString();
    }
    return this.http.get<any>(environment.baseUrl + url + (queryStr ? '?' + queryStr : ''))
      .pipe(
        map(response => response),
        catchError(error => {
          return throwError(error);
        })
      );
  }

  post(url: string, data: any, isLogin?: boolean): Observable<any> {
    return this.http.post<any>(environment.baseUrl + url, data)
      .pipe(
        map(response => response),
        catchError(error => {
          return throwError(error);
        })
      );
  }

  postWithFormData(url: string, data?: FormData): Observable<any> {
    return this.http.post<any>(environment.baseUrl + url, data)
      .pipe(
        map(response => response),
        catchError(error => {
          return throwError(error);
        })
      );
  }

  put(url: string, data?: any, id?: any): Observable<any> {
    if (typeof data === 'object' && data.id) {
      delete data.id;
    }

    if (id) {
      return this.http.put<any>(environment.baseUrl + url + '/' + id, data)
        .pipe(
          map(response => response),
          catchError(error => {
            return throwError(error);
          })
        );
    } else {
      return this.http.put<any>(environment.baseUrl + url, data)
        .pipe(
          map(response => response),
          catchError(error => {
            return throwError(error);
          })
        );
    }
  }

  putWithFormData(url: string, data?: FormData): Observable<any> {
    return this.http.put<any>(environment.baseUrl + url, data)
      .pipe(
        map(response => response),
        catchError(error => {
          return throwError(error);
        })
      );
  }

  delete(url: string): Observable<object> {
    return this.http.delete<any>(environment.baseUrl + url)
      .pipe(
        map(response => response),
        catchError(error => {
          return throwError(error);
        })
      );
  }
}
