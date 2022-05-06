export interface NoteModel {
  id: number;
  title: string;
  labels: number[];
  summary?: string;
  startDate: number;
  endDate: number;
}

