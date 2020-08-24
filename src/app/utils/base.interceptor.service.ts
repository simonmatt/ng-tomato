import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpResponse, HttpEvent } from '@angular/common/http';
import { mergeMap, catchError } from 'rxjs/operators';

import { } from '../../environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BaseInterceptorService implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // let authReq;
    // const access_token=req.headers.get('AccessToken');
    // if(!access_token){
    //   authReq=req.clone({
    //     setHeaders:{
    //       AccessToken:
    //     }
    //   })
    // }

    return next.handle(req)
      .pipe
      (mergeMap((event: any) => {
        return new Observable<HttpEvent<any>>();
      }));
  }
}
