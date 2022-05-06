import * as moment from 'moment';

export class AnalyzedNoteModel {
  id: number;
  title: string;
  labels: number[];
  summary?: string;
  dateTimes: string[];

  // @ts-ignore
  constructor(id: number, title: string, label: number[], summary?: string, startDate: number, endDate: number) {
    this.id = id;
    this.title = title;
    this.summary = summary ? summary : '';
    this.labels = label;
    this.dateTimes = this.GetDateTimes(startDate, endDate);
  }

  GetDateTimes(startUnixTime: number, endUnixTime: number): any {
    if (startUnixTime > endUnixTime) {
      return null
    }

    if (startUnixTime === endUnixTime) {
      if (moment.unix(startUnixTime).weekday() !== 0 && moment.unix(startUnixTime).weekday() !== 6) {
        return [moment.unix(startUnixTime).format('YYYY-MM-DD')]
      }
      return null
    }

    const dayDiff = moment.unix(endUnixTime).diff(moment.unix(startUnixTime), 'days');
    let dateTimes = [];
    for (let i = 0; i <= dayDiff - 1; i++) {
      const time = moment.unix(startUnixTime).add(i, 'd').format('YYYY-MM-DD');
      if (moment(moment.unix(startUnixTime).add(i, 'd')).weekday() !== 0 && moment(moment.unix(startUnixTime).add(i, 'd')).weekday() !== 6) {
        dateTimes.push(time);
      }
    }
    return dateTimes
  }

}
