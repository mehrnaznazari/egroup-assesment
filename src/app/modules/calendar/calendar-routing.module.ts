import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {CalendarComponent} from './calendar.component';
import {CalendarResolverService} from "./services/calendar-resolver.service";

const routes: Routes = [
  {
    path: '',
    component: CalendarComponent,
    //TODO uncomment this
    resolve : {notesResult: CalendarResolverService}
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalendarRoutingModule {
}
