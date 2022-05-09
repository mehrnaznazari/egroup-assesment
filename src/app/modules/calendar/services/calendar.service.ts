import {Injectable} from '@angular/core';

import {ApiService} from "../../../shared/services/api.service";
import {NoteModel} from "../models/note.model";
import {Observable, ReplaySubject} from "rxjs";
import {LabelModel} from "../models/label.model";
import {AnalyzedNoteModel} from "../models/analyzed-note.model";

@Injectable({
  providedIn: 'root'
})

export class CalendarService {

  private notesList: ReplaySubject<AnalyzedNoteModel[]> = new ReplaySubject<AnalyzedNoteModel[]>(1);
  notesList$: Observable<AnalyzedNoteModel[]> = this.notesList.asObservable();

  constructor(private apiService: ApiService) {
  }

  getAllNotes(): Observable<NoteModel[]> {
    return this.apiService.get('notes')
  }

  getAllLabels(): Observable<LabelModel[]> {
    return this.apiService.get('noteLabels')
  }

  setNoteList(obj: AnalyzedNoteModel[]): void {
    this.notesList.next(obj)
  }

  // getNoteList(): any {
  //   this.notesList.getValue()
  // }

}
