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
        // return [moment.unix(startUnixTime)]
      }
      return null
    }

    const dayDiff = moment.unix(endUnixTime).diff(moment.unix(startUnixTime), 'days');
    console.log(dayDiff)
    let dateTimes = [];
    // debugger
    for (let i = 0; i <= dayDiff; i++) {
      if (moment(moment.unix(startUnixTime).add(i, 'd')).weekday() !== 0 && moment(moment.unix(startUnixTime).add(i, 'd')).weekday() !== 6) {
        const time = moment.unix(startUnixTime).add(i, 'd').format('YYYY-MM-DD');
        dateTimes.push(time);
      }
    }

    /*
    //Start with Friday and more than 4 events
    if (dayDiff < 3) {
      for (let i = 0; i <= dayDiff; i++) {
        if (moment(moment.unix(startUnixTime).add(i, 'd')).weekday() !== 0 && moment(moment.unix(startUnixTime).add(i, 'd')).weekday() !== 6) {
          const time = moment.unix(startUnixTime).add(i, 'd').format('YYYY-MM-DD');
          dateTimes.push(time);
        }
      }
    }

    if (dayDiff >= 3 && (moment.unix(startUnixTime).weekday() === 5)) {
      dateTimes.push([moment.unix(startUnixTime).format('YYYY-MM-DD')])
      for (let i = 3; i <= dayDiff; i++) {
        if (moment(moment.unix(startUnixTime).add(i, 'd')).weekday() !== 0 && moment(moment.unix(startUnixTime).add(i, 'd')).weekday() !== 6) {
          const time = moment.unix(startUnixTime).add(i, 'd').format('YYYY-MM-DD');
          dateTimes.push(time);
        }
      }
    }

    if (dayDiff >= 4 && (moment.unix(startUnixTime).weekday() === 4)) {
      const temp = new Array();
      temp.push([moment.unix(startUnixTime).format('YYYY-MM-DD'), moment.unix(startUnixTime).add(1, 'd').format('YYYY-MM-DD')]);
      // dateTimes.push([moment.unix(startUnixTime).format('YYYY-MM-DD'), moment.unix(startUnixTime).add(1, 'd').format('YYYY-MM-DD')])
      for (let i = 4; i <= dayDiff; i++) {
        if (moment(moment.unix(startUnixTime).add(i, 'd')).weekday() !== 0 && moment(moment.unix(startUnixTime).add(i, 'd')).weekday() !== 6) {
          const time = moment.unix(startUnixTime).add(i, 'd').format('YYYY-MM-DD');
          dateTimes.push(time);
        }
      }
      dateTimes.push(temp)
    }
    */

    return dateTimes
  }

}
