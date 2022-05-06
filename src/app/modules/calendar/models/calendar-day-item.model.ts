import {LabelModel} from "./label.model";
import * as moment from "moment";

export interface CalendarDayItemModel{
  day: string;
  dayName: string;
  className?: string;
  isWeekend: boolean;
  weekLabel: LabelModel;
  date: moment.Moment;
}

