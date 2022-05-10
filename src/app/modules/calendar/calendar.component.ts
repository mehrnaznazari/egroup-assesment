import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import * as moment from "moment";

import {AnalyzedNoteModel} from "./models/analyzed-note.model";
import {CalendarDayItemModel} from "./models/calendar-day-item.model";
import {LabelModel} from "./models/label.model";
import {NoteModel} from "./models/note.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {EditCardModalComponent} from "./components/edit-card-modal/edit-card-modal.component";
import {CalendarService} from "./services/calendar.service";

@UntilDestroy()

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CalendarComponent implements OnInit {
  labels: LabelModel[] = [];
  calendar!: Array<CalendarDayItemModel[]>;
  weekOfYear!: number;
  firstDayOfWeek!: string;
  moment = moment;
  notesList!: AnalyzedNoteModel[];
  filter = 0;

  constructor(private route: ActivatedRoute,
              private ngbModal: NgbModal,
              public calendarService: CalendarService) {
  }

  ngOnInit(): void {
    this.route.data
      .pipe(untilDestroyed(this))
      .subscribe(res => {
        this.modifyLabelNote(res.notesResult.labels)
        this.analyseNotes(res.notesResult.notes.notes);
      })

    this.calendarService.notesList$
      .pipe(untilDestroyed(this))
      .subscribe(res => {
        this.notesList = res;
      })
  }

  modifyLabelNote(labels: LabelModel[]): void {
    const all = {
      id: 0,
      text: 'All'
    }
    this.labels.push(all);
    this.labels = this.labels.concat(labels);
  }

  analyseNotes(notes: NoteModel[]): void {
    let tempAnalyzedNote: AnalyzedNoteModel[] = [];

    notes.forEach((note: NoteModel) => {
      const dayDiff = moment.unix(note.endDate).diff(moment.unix(note.startDate), 'days');
      const startDayOfWeek = moment.unix(note.startDate).weekday();

      if (dayDiff < 3) {
        const temp = new AnalyzedNoteModel(note.id, note.title, note.labels, note.summary, note.startDate, note.endDate);
        temp.dateTimes !== null ? tempAnalyzedNote.push(temp) : null;
      }

      if (dayDiff > 3) {
        //Start On Friday
        if (startDayOfWeek === 5) {
          //  i = 3;
          tempAnalyzedNote.push(new AnalyzedNoteModel(note.id, note.title, note.labels, note.summary, note.startDate, note.startDate));
          tempAnalyzedNote.push(new AnalyzedNoteModel(note.id, note.title, note.labels, note.summary, Number(moment.unix(note.startDate).add(3, 'd')), note.endDate));
          return
        }
        if (startDayOfWeek === 4) {
          tempAnalyzedNote.push(new AnalyzedNoteModel(note.id, note.title, note.labels, note.summary, note.startDate, Number(moment.unix(note.startDate).add(1, 'd').format('X'))));
          //  i = 4;
          tempAnalyzedNote.push(new AnalyzedNoteModel(note.id, note.title, note.labels, note.summary, Number(moment.unix(note.startDate).add(4, 'd').format('X')), note.endDate));
        }
      }
      return tempAnalyzedNote;
      // return temp.dateTimes !== null ? tempAnalyzedNote.push(temp) : null;
    })
    this.calendarService.setNoteList(tempAnalyzedNote);
    this.generationData(tempAnalyzedNote[0].dateTimes[0]);

    console.log('tempAnalyzedNote', tempAnalyzedNote)
  }

  generationData(firstDay: string): void {
    this.firstDayOfWeek = firstDay;
    this.calendar = this.createWeekView(firstDay);
    this.weekOfYear = moment(firstDay).week();
    // console.log('firstDayOfWeek', this.firstDayOfWeek)
    // console.log('calendar->', this.createWeekView(this.firstDayOfWeek))
  }

  createWeekView(date: string) {
    const weekdaysShort = moment.weekdaysShort();
    const weekLabels: LabelModel[] = [];

    for (let i = 0; i <= this.labels.length - 1; i++) {
      weekLabels.push(this.labels[i]);
    }

    const myCalendar: Array<CalendarDayItemModel[]> = [];
    for (let i = 0; i < weekLabels.length; i++) {
      const weekLabel = weekLabels[i];
      myCalendar[i] = [];
      const clone = moment(date).startOf('weeks');

      for (const dayName of weekdaysShort) {
        myCalendar[i].push({
          dayName,
          day: clone.format('DD/MM'),
          isWeekend: dayName === 'Sun' || dayName === 'Sat',
          weekLabel,
          date: clone.clone(),
        });
        clone.add(1, 'days');
      }
    }
    return myCalendar;
  }

  arrowHandler(action: string): void {
    this.filter = 0
    if (action === 'next') {
      this.firstDayOfWeek = moment(this.firstDayOfWeek).add(1, 'week').format("YYYY-MM-DD");
    } else {
      this.firstDayOfWeek = moment(this.firstDayOfWeek).subtract(1, 'week').format("YYYY-MM-DD");
    }
    this.generationData(this.firstDayOfWeek);
  }

  findNoteInNotes(date: moment.Moment): AnalyzedNoteModel[] {
    return this.notesList.filter(note => note.dateTimes[0] === moment(date).format("YYYY-MM-DD"))
    // return this.notesList.filter(note => moment(note.dateTimes[0]).format("YYYY-MM-DD") === (date).format("YYYY-MM-DD") )
  }

  changeFilter($event: any): void {
    this.calendar = this.createWeekView(this.firstDayOfWeek);
    this.filter =$event.target.value;
    let temp = [];
    if ($event.target.value === '0') {
      temp = this.calendar;
    } else {
      temp.push(this.calendar[0])
      temp.push(this.calendar[$event.target.value])
    }
    this.calendar = temp;
  }

  selectDay(day: CalendarDayItemModel, note: AnalyzedNoteModel): void {
    const editCart = this.ngbModal.open(EditCardModalComponent, {centered: true});
    editCart.componentInstance.noteItem = note;
  }
}
