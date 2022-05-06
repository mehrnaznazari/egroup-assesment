import {Injectable} from '@angular/core';

import {ApiService} from "../../../shared/services/api.service";
import {NoteModel} from "../models/note.model";
import {Observable} from "rxjs";
import {LabelModel} from "../models/label.model";

@Injectable({
  providedIn: 'root'
})

export class CalendarService {
  constructor(private apiService: ApiService) {
  }

  getAllNotes(): Observable<NoteModel[]> {
    return this.apiService.get('notes')
  }

  getAllLabels(): Observable<LabelModel[]> {
    return this.apiService.get('noteLabels')
  }

}
