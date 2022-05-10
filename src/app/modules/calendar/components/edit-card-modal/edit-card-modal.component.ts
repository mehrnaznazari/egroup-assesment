import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AnalyzedNoteModel} from "../../models/analyzed-note.model";
import {CalendarService} from "../../services/calendar.service";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import * as moment from "moment";
import {NoteModel} from "../../models/note.model";
import {HttpErrorResponse} from "@angular/common/http";
import {DeleteCardModalComponent} from "../delete-card-modal/delete-card-modal.component";

@UntilDestroy()

@Component({
  selector: 'app-edit-card-modal',
  templateUrl: './edit-card-modal.component.html',
  styleUrls: ['./edit-card-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class EditCardModalComponent implements OnInit {
  editForm!: FormGroup;
  @Input() noteItem!: AnalyzedNoteModel;
  notesList!: AnalyzedNoteModel[];
  moment = moment;

  constructor(private formBuilder: FormBuilder,
              public activeModal: NgbActiveModal,
              private ngbModal: NgbModal,
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
      cardTitle: new FormControl(this.noteItem.title, [Validators.required]),
      cardDescription: new FormControl(this.noteItem.summary, [Validators.required, Validators.maxLength(250)]),
      startDatePicker: new FormControl({
        "year": Number(startEvent[0]),
        "month": Number(startEvent[1]),
        "day": Number(startEvent[2])
      }, [Validators.required]),
      endDatePicker: new FormControl(endEvent),
    });

    this.calendarService.notesList$
      .pipe(untilDestroyed(this))
      .subscribe(res => {
        this.notesList = res;
      })
  }

  editFormSubmit(): void {
    console.log(this.editForm.value)
    if (!this.editForm.value.cardTitle && !this.editForm.value.cardDescription && !this.editForm.value.startDatePicker) {
      return
    }

    let startDate = null;
    let endDate = null;
    //Create Start Date
    startDate = new Date(this.editForm.value.startDatePicker.year, this.editForm.value.startDatePicker.month - 1, this.editForm.value.startDatePicker.day);
    //Create End Date
    if (this.editForm.value.endDatePicker) {
      endDate = new Date(this.editForm.value.endDatePicker.year, this.editForm.value.endDatePicker.month - 1, this.editForm.value.endDatePicker.day);
      this.editForm.setErrors({'invalid': !(startDate && (endDate < startDate))});
    } else {
      endDate = startDate;
    }
    // Create Note with new data
    const newNote = new AnalyzedNoteModel(this.noteItem.id, this.editForm.value.cardTitle, this.noteItem.labels, this.editForm.value.cardDescription, Number(moment(startDate).format('X')), Number(moment(endDate).format('X')));
    if (!newNote.dateTimes) {
      this.editForm.setErrors({'invalid': true});
      return;
    }
    console.log('newNote: ', newNote)

    const payload: NoteModel = {
      id: this.noteItem.id,
      title: this.editForm.value.cardTitle,
      summary: this.editForm.value.cardDescription,
      labels: this.noteItem.labels,
      startDate: Number(moment(startDate).format('X')),
      endDate: Number(moment(endDate).format('X')),
    };
    this.calendarService.editNoteHandler(this.noteItem.id, JSON.stringify(payload))
      .pipe(untilDestroyed(this))
      .subscribe(res => {
          console.log(res)
        },
        (error: HttpErrorResponse) => {
          // alert(error.message);
        })

    const index = this.notesList.findIndex(note => note.id === newNote.id);
    if (index > -1) {
      this.notesList[index] = newNote;
      this.calendarService.setNoteList(this.notesList);
    } else {
      return;
    }
    this.editForm.reset();
    this.activeModal.dismiss('CLOSE');
  }

  onCancel(): void {
    this.editForm.reset();
    this.activeModal.dismiss('CLOSE');
  }

  delete():void{
    const editCart = this.ngbModal.open(DeleteCardModalComponent, {centered: true});
    editCart.componentInstance.noteItem = this.noteItem;
    this.activeModal.dismiss('CLOSE');
  }
}
