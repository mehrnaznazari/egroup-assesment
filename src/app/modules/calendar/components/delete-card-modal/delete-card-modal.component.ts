import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {NoteModel} from "../../models/note.model";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {CalendarService} from "../../services/calendar.service";
import {AnalyzedNoteModel} from "../../models/analyzed-note.model";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@UntilDestroy()

@Component({
  selector: 'app-delete-card-modal',
  templateUrl: './delete-card-modal.component.html',
  styleUrls: ['./delete-card-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DeleteCardModalComponent implements OnInit {
  @Input() noteItem!: NoteModel;
  notesList!: AnalyzedNoteModel[];

  constructor(private calendarService: CalendarService,
              private activeModal: NgbActiveModal) {
  }

  ngOnInit(): void {
    this.calendarService.notesList$
      .pipe(untilDestroyed(this))
      .subscribe(res => {
        this.notesList = res;
      })
  }

  onCancel(): void {
    this.activeModal.dismiss('CLOSE');
  }

  deleteHandler(): void {
    const index = this.notesList.findIndex(note => note.id === this.noteItem.id);
    if (index > -1) {
      this.notesList.splice(index, 1);
      this.calendarService.setNoteList(this.notesList);
    }
    this.activeModal.dismiss('CLOSE');
  }
}
