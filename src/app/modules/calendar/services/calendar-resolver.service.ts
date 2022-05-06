import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {map} from "rxjs/operators";

import {CalendarService} from "./calendar.service";
import {forkJoin, Observable} from "rxjs";

@Injectable(
  {providedIn: 'root'}
)

export class CalendarResolverService implements Resolve<any> {
  constructor(private calendarService: CalendarService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return forkJoin([
      this.calendarService.getAllNotes(),
      this.calendarService.getAllLabels()
    ])
      .pipe(
        map(res => {
          return {
            notes: res[0],
            labels: res[1]
          }
        })
      )
  }

}

