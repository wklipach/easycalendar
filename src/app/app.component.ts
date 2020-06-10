import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'easycalendar';

  // public gv: GlobalVariableClass;
  weekCount = 0;
  weekFirst = 0;
  curMonth = 0;
  arrarWeekMonth: any;
  curDate: Date;


  constructor() {
    this.curDate = new Date();
  }

  ngOnInit(): void {

    this.initMethod ( this.curDate );

  }


  public initMethod(curDate: Date) {

    const weekCount = this.getWeeks(curDate.getFullYear(), curDate.getMonth());
    const weekFirst = this.getFirstWeeks(curDate.getFullYear(), curDate.getMonth());
    this.arrarWeekMonth = this.getWeekArrayCount(weekCount, weekFirst, curDate.getFullYear(), curDate);

    // console.log('this.arrarWeekMonth', this.arrarWeekMonth);
  }


  // дата начала заданной недели ISO8601 (которая всегда будет понедельником)
  getDateOfISOWeek(w, y) {
    const simple = new Date(y, 0, 1 + (w - 1) * 7);
    const dow = simple.getDay();
    const ISOweekStart = simple;
    if (dow <= 4) {
        ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
    }
    else {
        ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
    }
    return ISOweekStart;
}

  // массив с номерами недель и первыми числами недели

  public getWeekArrayCount(weekCount, weekFirst, y, curDate) {

  return Array<any> (weekCount).fill([0, null]).map((x: any, i: any) =>
    [
     {tagMo: this.getTag(i + weekFirst, y, 0),
      dayMo: this.getValue(i + weekFirst, y, 0),
      weekISOnumber: i + weekFirst,
      weekNumber: i,
      boolCurMonth: this.getPeriod(i + weekFirst, y, 0, curDate)},

     {tagTu: this.getTag(i + weekFirst, y, 1),
      dayTu: this.getValue(i + weekFirst, y, 1),
      weekISOnumber: i + weekFirst,
      weekNumber: i,
      boolCurMonth: this.getPeriod(i + weekFirst, y, 1, curDate)},

     {tagWe: this.getTag(i + weekFirst, y, 2),
      dayWe: this.getValue(i + weekFirst, y, 2),
      weekISOnumber: i + weekFirst,
      weekNumber: i,
      boolCurMonth: this.getPeriod(i + weekFirst, y, 2, curDate)},

     {tagTh: this.getTag(i + weekFirst, y, 3),
      dayTh: this.getValue(i + weekFirst, y, 3),
      weekISOnumber: i + weekFirst,
      weekNumber: i,
      boolCurMonth: this.getPeriod(i + weekFirst, y, 3, curDate)},

     {tagFr: this.getTag(i + weekFirst, y, 4),
      dayFr: this.getValue(i + weekFirst, y, 4),
      weekISOnumber: i + weekFirst,
      weekNumber: i,
      boolCurMonth: this.getPeriod(i + weekFirst, y, 4, curDate)},

     {tagSa: this.getTag(i + weekFirst, y, 5),
      daySa: this.getValue(i + weekFirst, y, 5),
      weekISOnumber: i + weekFirst,
      weekNumber: i,
      boolCurMonth: this.getPeriod(i + weekFirst, y, 5, curDate)},

     {tagSu: this.getTag(i + weekFirst, y, 6),
      daySu: this.getValue(i + weekFirst, y, 6),
      weekISOnumber: i + weekFirst,
      weekNumber: i,
      boolCurMonth: this.getPeriod(i + weekFirst, y, 6, curDate)}

  ]);
  }

  getPeriod(week, y, addDay, curDate) {

    const curD = new Date(curDate);
    const varDay = new Date(this.getIncDate( this.getDateOfISOWeek(week, y), addDay));

    const d = varDay.getMonth();

    if (curD.getFullYear() !== varDay.getFullYear() || curD.getMonth() !== varDay.getMonth()) {
      return false;
    } else {
      return true; }
  }

  getValue(week, y, addDay) {
    const res = new Date(this.getIncDate( this.getDateOfISOWeek(week, y), addDay)).getDate();
    return res;
  }

  getTag(week, y, addDay) {
    return this.formatDate(this.getIncDate( this.getDateOfISOWeek(week, y), addDay));
  }

// число недель в месяце вместе с неполными неделями, неделя с понедельника
  getWeeks(year, month) {
    const l = new Date(year, month + 1, 0);
    return Math.ceil( (l.getDate() - (l.getDay() ? l.getDay() : 7)) / 7 ) + 1;
  }

  getFirstWeeks(year, month) {
    const date = new Date(year, month, 1);
    return this.getWeekNumber(date);
  }


  // получение ISO номера недели по дате
  getWeekNumber(date) {
  // Thursday in current week decides the year.
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  // January 4 is always in week 1.
  const week1 = new Date(date.getFullYear(), 0, 4);
  // Adjust to Thursday in week 1 and count number of weeks from date to week1.
  return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
                                  - 3 + (week1.getDay() + 6) % 7) / 7);
}

// дата для идентификации элементов в виде dd.mm.yyyy
formatDate(date) {
  const d = new Date(date);
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) {
      month = '0' + month.toString();
  }
  if (day.length < 2) {
      day = '0' + day.toString();
  }

  return [day, month, year].join('.');
}

public getIncDate(value, addDays) {
  return  value.setDate(value.getDate() + addDays);
}

prev() {
  this.curDate.setDate(1);
  this.curDate.setMonth(this.curDate.getMonth() - 1);
  this.initMethod ( this.curDate );
}

next() {
  this.curDate.setDate(1);
  this.curDate.setMonth(this.curDate.getMonth() + 1);
  this.initMethod ( this.curDate );
}

now() {
  this.curDate = new Date();
  this.initMethod ( this.curDate );
}


}
