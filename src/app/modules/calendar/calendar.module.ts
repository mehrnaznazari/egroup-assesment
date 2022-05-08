import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CalendarComponent} from './calendar.component';
import {CalendarRoutingModule} from './calendar-routing.module';
import {EditCardModalComponent} from './components/edit-card-modal/edit-card-modal.component';
import {DeleteCardModalComponent} from './components/delete-card-modal/delete-card-modal.component'
import {ReactiveFormsModule} from "@angular/forms";
import {NgbDatepickerModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [
    CalendarComponent,
    EditCardModalComponent,
    DeleteCardModalComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CalendarRoutingModule,
    NgbDatepickerModule,
  ],
  exports: []
})
export class CalendarModule {
}

