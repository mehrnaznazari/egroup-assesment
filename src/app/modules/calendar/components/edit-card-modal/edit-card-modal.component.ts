import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal, NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";

import {CalendarDayItemModel} from "../../models/calendar-day-item.model";

@Component({
  selector: 'app-edit-card-modal',
  templateUrl: './edit-card-modal.component.html',
  styleUrls: ['./edit-card-modal.component.scss']
})

export class EditCardModalComponent implements OnInit {
  editForm!: FormGroup;
  @Input() calendarData!: CalendarDayItemModel;
  model!: NgbDateStruct;

  constructor(private formBuilder: FormBuilder,
              private activeModal: NgbActiveModal) {

    this.editForm = this.formBuilder.group({
      cartDescription: new FormControl('', [Validators.required, Validators.maxLength(250)]),
      datePicker: new FormControl('' ),
    });
  }

  ngOnInit(): void {
  }

  editFormSubmit(): void {
    console.log(this.editForm.value)

    this.editForm.reset();
    this.activeModal.dismiss('CLOSE');
  }

}
