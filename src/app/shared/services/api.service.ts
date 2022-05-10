import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ConfigService} from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  httpOptions: any = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
      'Access-Control-Allow-Headers': '*',
    }),
    observe: 'response'
  };

  private readonly serverURL: string;

  constructor(private httpClient: HttpClient,
              private configService: ConfigService) {
    this.serverURL = `${this.configService.baseUrl}/api/`;
  }

  get<T>(url: string, queryParams?: any): Observable<T> {
    const queryParamsLocal = {...queryParams};

    if (queryParams) {
      for (const key in queryParamsLocal) {
        if (queryParamsLocal.hasOwnProperty(key)) {
          if (queryParamsLocal[key] === undefined || queryParamsLocal[key] === null) {
            delete queryParamsLocal[key];
          }
        }
      }
    }

    return this.httpClient.get<T>(this.serverURL + url, this.httpOptions)
      .pipe(
        map((res: any) => {
          return res.body;
        })
      );
  }

  put<T>(url: string, payload: T): any {
    return this.httpClient.put<T>((this.serverURL) + url, payload, this.httpOptions)
      .pipe(
        map((res: any) => {
          return res.body;
        })
      );
  }
}
