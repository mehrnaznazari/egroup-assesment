import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal, NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";

import {CalendarDayItemModel} from "../../models/calendar-day-item.model";
import {AnalyzedNoteModel} from "../../models/analyzed-note.model";
import {CalendarService} from "../../services/calendar.service";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import * as moment from "moment";

@UntilDestroy()

@Component({
  selector: 'app-edit-card-modal',
  templateUrl: './edit-card-modal.component.html',
  styleUrls: ['./edit-card-modal.component.scss']
})

export class EditCardModalComponent implements OnInit {
  editForm!: FormGroup;
  @Input() calendarData!: CalendarDayItemModel;
  @Input() noteItem!: AnalyzedNoteModel;
  model!: NgbDateStruct;
  notesList!: AnalyzedNoteModel[];

  constructor(private formBuilder: FormBuilder,
              public activeModal: NgbActiveModal,
              private calendarService: CalendarService) {
  }

  ngOnInit(): void {
    const startEvent = this.noteItem.dateTimes[0].split('-');
    let endEvent = null;
    if (this.noteItem.dateTimes.length > 1) {
      const endDate = this.noteItem.dateTimes[this.noteItem.dateTimes.length - 1].split('-');
      endEvent = {"year": Number(endDate[0]), "month": Number(endDate[1]), "day": Number(endDate[2])}
    }
    this.editForm = this.formBuilder.group({
      cardDescription: new FormControl(null, [Validators.maxLength(250)]),
      startDatePicker: new FormControl({
        "year": Number(startEvent[0]),
        "month": Number(startEvent[1]),
        "day": Number(startEvent[2])
      }),
      endDatePicker: new FormControl(endEvent),
    });

    this.calendarService.notesList$
      .pipe(untilDestroyed(this))
      .subscribe(res => {
        this.notesList = res;
      })
  }

  editFormSubmit(): void {
    debugger
    console.log(this.editForm.value)
    if (!this.editForm.value.cardDescription && !this.editForm.value.startDatePicker) {
      return
    }

    if (this.editForm.value.cardDescription) {
      this.noteItem.summary = this.editForm.value.cardDescription;
    }

    /*    if (this.editForm.value.startDatePicker) {
          const startDate = new Date(this.editForm.value.startDatePicker.year, this.editForm.value.startDatePicker.month - 1, this.editForm.value.startDatePicker.day);
          const endDate = this.noteItem.dateTimes.length === 1 ? startDate : this.noteItem.dateTimes[this.noteItem.dateTimes.length - 1];
          const newNote = new AnalyzedNoteModel(this.noteItem.id, this.noteItem.title, this.noteItem.labels, this.noteItem.summary, Number(moment(startDate).format('X')), Number(moment(endDate).format('X')));

          // this.noteItem.dateTimes.splice(0, this.noteItem.dateTimes, ...temp)

          // console.log('const startDate', startDate, moment(startDate).unix())
          // console.log('startDate: ', startDate, Number(moment(startDate).format('X')))
          // console.log('endDate: ', endDate, Number(moment(endDate).format('X')))
          // console.log('new', newNote.dateTimes[0], moment(newNote.dateTimes[0]).format("YYYY-MM-DD"))
          // temp.dateTimes !== null ? (temp) : null;
          // console.log(this.noteItem.dateTimes)
        }*/

    let startDate = null;
    let endDate = null;
    if (this.editForm.value.startDatePicker) {
      startDate = new Date(this.editForm.value.startDatePicker.year, this.editForm.value.startDatePicker.month - 1, this.editForm.value.startDatePicker.day);
      endDate = this.noteItem.dateTimes.length === 1 ? startDate : new Date(this.editForm.value.endDatePicker.year, this.editForm.value.endDatePicker.month - 1, this.editForm.value.endDatePicker.day);
    }

    if (this.editForm.value.endDatePicker) {
      endDate = new Date(this.editForm.value.endDatePicker.year, this.editForm.value.endDatePicker.month - 1, this.editForm.value.endDatePicker.day);
      this.editForm.setErrors({'invalid': !(startDate && (endDate < startDate))});
    }

    const newNote = new AnalyzedNoteModel(this.noteItem.id, this.noteItem.title, this.noteItem.labels, this.noteItem.summary, Number(moment(startDate).format('X')), Number(moment(endDate).format('X')));
    if (!newNote.dateTimes) {
      this.editForm.setErrors({'invalid': true});
      return;
    }
    this.noteItem.dateTimes = newNote.dateTimes;

    const index = this.notesList.findIndex(note => note.id === this.noteItem.id);
    console.log('inex', index)
    if (index > -1) {
      this.notesList[index] = this.noteItem;
    }
    this.calendarService.setNoteList(this.notesList);


    this.editForm.reset();
    this.activeModal.dismiss('CLOSE');
  }

}
