import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
    {path: '', redirectTo: 'calendar', pathMatch: 'full'},
    {
      path: 'calendar',
      data: {title: 'calendar'},
      loadChildren: () => import('./modules/calendar/calendar.module').then(m => m.CalendarModule)
    }
  ]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class AppRoutingModule {
}
