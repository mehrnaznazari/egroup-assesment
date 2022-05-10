import {Injectable} from '@angular/core';
import {Observable, ReplaySubject} from "rxjs";

import {ApiService} from "../../../shared/services/api.service";
import {AnalyzedNoteModel} from "../models/analyzed-note.model";
import {NoteModel} from "../models/note.model";
import {LabelModel} from "../models/label.model";

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

  editNoteHandler(nodeId: number, payload: any): Observable<NoteModel[]> {
    const url = `notes/${nodeId}`;
    return this.apiService.put(url, payload)
  }

  setNoteList(obj: AnalyzedNoteModel[]): void {
    this.notesList.next(obj)
  }

}
