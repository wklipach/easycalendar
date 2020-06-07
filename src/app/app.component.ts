import { Component, OnInit } from '@angular/core';

class GlobalVariableClass {
  private weekCount = 0;
  private month = 0;
  private year = 2020;

  public setWeekCount(value) {
    this.weekCount = value;
  }
  public getWeekCount() {
    return this.weekCount;
  }

  public getWeekArrayCount() {
    return Array(this.weekCount).fill(0).map((x, i) => i);
  }


  public setMontht(value) {
    this.month = value;
  }

  public getMonth() {
    return this.month;
  }

  public setYear(value) {
    this.year = value;
  }
  public getYeart() {
    return this.year;
  }

}



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'easycalendar';

  public gv: GlobalVariableClass;

  constructor() {
    this.gv  = new GlobalVariableClass();
    this.initMethod ( new Date() );
  }

  ngOnInit(): void {

  }


  public initMethod(curDate: Date) {
    this.gv.setWeekCount(this.getWeeks(curDate.getFullYear(), curDate.getMonth()));
  }

// число недель в месяце вместе с неполными неделями, неделя с понедельника
  getWeeks(year, month) {
    const l = new Date(year, month + 1, 0);
    return Math.ceil( (l.getDate() - (l.getDay() ? l.getDay() : 7)) / 7 ) + 1;
  }




}
