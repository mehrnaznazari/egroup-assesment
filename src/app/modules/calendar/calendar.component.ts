import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import * as moment from "moment";

import {AnalyzedNoteModel} from "./models/analyzed-note.model";
import {CalendarDayItemModel} from "./models/calendar-day-item.model";
import {LabelModel} from "./models/label.model";
import {NoteModel} from "./models/note.model";

@UntilDestroy()

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})

export class CalendarComponent implements OnInit {
  labels: LabelModel[] = [];
  calendar!: Array<CalendarDayItemModel[]>;
  notes!: AnalyzedNoteModel[];
  weekOfYear!: number;
  firstDayOfWeek!: string;


  result = {
    notes: {
      "notes": [
        {
          "id": 1,
          "title": "Quick try on DB",
          "startDate": 1641164400,
          "endDate": 1641164400,
          "labels": [1, 3],
          "summary": "One morning, when Gregor Samsa woke from troubled dreams."
        }, {
          "id": 2,
          "title": "Dirty check",
          "startDate": 1641250800,
          "endDate": 1641250800,
          "labels": [2],
          "summary": "MTV"
        }, {
          "id": 3,
          "title": "Fix a the bug",
          "startDate": 1641250800,
          "endDate": 1641337200,
          "labels": [2],
          "summary": "DJs flock by when MTV ax quiz"
        }, {
          "id": 4,
          "title": "Improve backend",
          "startDate": 1641337200,
          "endDate": 1641337200,
          "labels": [1, 2],
          "summary": "totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vit"
        }, {
          "id": 5,
          "title": "Add chat feature",
          "startDate": 1641337200,
          "endDate": 1641423600,
          "labels": [3],
          "summary": "One morning,"
        }, {
          "id": 6,
          "title": "Improve submodule",
          "startDate": 1641337200,
          "endDate": 1641337200,
          "labels": [3],
          "summary": "he quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax quiz prog"
        }, {
          "id": 7,
          "title": "Extend calendar",
          "startDate": 1641510000,
          "endDate": 1641510000,
          "labels": [1, 2],
          "summary": "A collection of textile samples"
        }, {
          "id": 8,
          "title": "Friends check",
          "startDate": 1641510000,
          "endDate": 1641510000,
          "labels": [1, 3],
          "summary": "Gregor then turned to look out the window at the dull weather. Drops of rain could be heard hitting the pane, which made him feel quite sad."
        }, {
          "id": 9,
          "title": "Write some code",
          "startDate": 1641769200,
          "endDate": 1641942000,
          "labels": [1],
          "summary": "Far far away, behind the word mountains,"
        }, {
          "id": 10,
          "title": "YAML really?",
          "startDate": 1641855600,
          "endDate": 1641855600,
          "labels": [1, 3],
          "summary": "Separated they live in Bookmarksgrove right at the coast o"
        }, {
          "id": 11,
          "title": "Get together",
          "startDate": 1641942000,
          "endDate": 1641942000,
          "labels": [2],
          "summary": "he quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax quiz prog"
        }, {
          "id": 12,
          "title": "Extend mid module",
          "startDate": 1641942000,
          "endDate": 1641942000,
          "labels": [2, 3],
          "summary": "Separated they live in Bookmarksgrove"
        }, {
          "id": 13,
          "title": "Optimize start",
          "startDate": 1641942000,
          "endDate": 1641942000,
          "labels": [2, 3],
          "summary": "Gregor then turned to look out the window at the dull weather. Drops of rain could be heard hitting the pane, which made him feel quite sad."
        }, {
          "id": 14,
          "title": "Optimize end",
          "startDate": 1642028400,
          "endDate": 1642374000,
          "labels": [2],
          "summary": "His room, a proper human room although a little too small, lay peacefully between its four familiar walls"
        }, {
          "id": 15,
          "title": "Buy a cake",
          "startDate": 1642114800,
          "endDate": 1642114800,
          "labels": [2, 3],
          "summary": "Their separate existence is a myth. For science, music, sport, etc, Europe uses the same vocabulary. The languages only differ in their grammar."
        }, {
          "id": 101,
          "title": "Options",
          "startDate": 1642114800,
          "endDate": 1642114800,
          "labels": [1],
          "summary": "The quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax quiz prog. Junk MTV quiz graced by fox whelps."
        }, {
          "id": 17,
          "title": "Blind Geme",
          "startDate": 1642460400,
          "endDate": 1642460400,
          "labels": [2],
          "summary": "One morning,"
        }, {
          "id": 18,
          "title": "Extend Entry module",
          "startDate": 1642460400,
          "endDate": 1642460400,
          "labels": [2],
          "summary": "DJs flock by when MTV ax quiz"
        }, {
          "id": 19,
          "title": "Order drinks",
          "startDate": 1642460400,
          "endDate": 1642633200,
          "labels": [3],
          "summary": "The quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax quiz prog. Junk MTV quiz graced by fox whelps. Bawds jog, flick quartz, vex nymphs. Waltz, bad nymph, for quick jigs vex! Fox nymphs grab quick-jived waltz. Brick quiz whangs jumpy."
        }, {
          "id": 20,
          "title": "Celebrate something",
          "startDate": 1642633200,
          "endDate": 1642633200,
          "labels": [1, 2, 3],
          "summary": "The quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax quiz prog. Junk MTV quiz graced by fox whelps."
        }, {
          "id": 21,
          "title": "End up",
          "startDate": 1642719600,
          "endDate": 1642719600,
          "labels": [2],
          "summary": "A collection of textile samples"
        }]
    },
    labels: [{"id": 1, "text": "Frontend"}, {"id": 2, "text": "Backend"}, {"id": 3, "text": "Security"}]
  };

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.data
      .pipe(untilDestroyed(this))
      .subscribe(res => {
        this.modifyLabelNote(res.notesResult.labels)
        this.analyseNotes(res.notesResult.notes.notes);
      })

    // this.modifyLabelNote(this.result.labels)
    // this.analyseNotes(this.result.notes.notes);

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
    notes.map((note: NoteModel) => {
      const temp = new AnalyzedNoteModel(note.id, note.title, note.labels, note.summary, note.startDate, note.endDate);
      return temp.dateTimes !== null ? tempAnalyzedNote.push(temp) : null;
    })

    this.notes = tempAnalyzedNote;
    this.generationData(tempAnalyzedNote[0].dateTimes[0]);

    console.log('tempAnalyzedNote', tempAnalyzedNote)
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

  generationData(firstDay: string): void {
    this.firstDayOfWeek = firstDay;
    this.calendar = this.createWeekView(firstDay);
    this.weekOfYear = moment(firstDay).week();

    console.log('firstDayOfWeek', this.firstDayOfWeek)
    console.log('calendar->', this.createWeekView(this.firstDayOfWeek))
  }

  arrowHandler(action: string): void {
    if (action === 'next') {
      this.firstDayOfWeek = moment(this.firstDayOfWeek).add(1, 'week').format("YYYY-MM-DD");
    } else {
      this.firstDayOfWeek = moment(this.firstDayOfWeek).subtract(1, 'week').format("YYYY-MM-DD");
    }
    this.generationData(this.firstDayOfWeek);
  }

  findNoteInNotes(date: moment.Moment): AnalyzedNoteModel[] {
    return this.notes.filter(note => note.dateTimes[0] === moment(date).format("YYYY-MM-DD"))
  }

  changeFilter($event: any): void {
    this.calendar = this.createWeekView(this.notes[0].dateTimes[0]);
    let temp = [];
    if ($event.target.value === '0') {
      temp = this.calendar;
    } else {
      temp.push(this.calendar[0])
      temp.push(this.calendar[$event.target.value])
    }
    this.calendar = temp;
  }
}
