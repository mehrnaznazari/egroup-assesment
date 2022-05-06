import {Injectable} from '@angular/core';
import {HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {interval, Observable, throwError} from 'rxjs';
import {catchError, map, take} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        map((event: HttpEvent<any>) => {
          if (event.type === HttpEventType.Sent) {
            const requestMethod: string = req.method;
            console.log('loading')
          }
          return event;
        }),
        catchError((err, caught) => {
          if (err.status && (err.status === 401 || err.status === 403)) {
            console.log('unAuthorise')
          }
          if (err.status && (err.status !== 400 && err.status !== 404)) {
            console.log(err);
          }
          return throwError(err);
        })
      );
  }
}
