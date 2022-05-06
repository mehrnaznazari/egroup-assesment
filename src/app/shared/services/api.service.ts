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
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
    observe: 'response'
  };

  private readonly serverURL: string;

  constructor(private httpClient: HttpClient,
              private configService: ConfigService) {
    this.serverURL = `${this.configService.baseUrl}/pinguin/api/`;
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

    let options: any = {
      observe: this.httpOptions.observe,
      params: queryParamsLocal
    };

    return this.httpClient.get<T>(this.serverURL + url, options)
      .pipe(
        map((res: any) => {
          return res.body;
        })
      );
  }

}
