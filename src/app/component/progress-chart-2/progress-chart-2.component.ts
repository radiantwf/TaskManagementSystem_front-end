import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'progress-chart-2',
  templateUrl: './progress-chart-2.component.html',
  styleUrls: ['./progress-chart-2.component.css',
    './../element-record/element-record.component.css'],
  inputs: ['planningBeginDate', 'planningEndDate', 'realBeginDate', 'realEndDate']
})
export class ProgressChart2Component implements OnInit {
  planningBeginDate: Date;
  planningEndDate: Date;
  realBeginDate: Date;
  realEndDate: Date;
  private endDateDifference = 0;
  private isNoPlanning = false;
  private dateNow: Date;
  constructor() { }

  ngOnInit() {
    this.dateNow = new Date(Date.now());
    this.dateNow.setHours(0, 0, 0, 0);
    if (this.planningBeginDate === null || this.planningEndDate === null) {
      this.isNoPlanning = true;
      return;
    }
    if (this.realBeginDate === null) {
      this.endDateDifference = -1;
      return;
    }
    if (this.realEndDate === null) {
      var endTime1 = (new Date(this.planningEndDate)).getTime();
      var endTime2 = this.dateNow.getTime();
      this.endDateDifference = (endTime1 - endTime2) / 1000 / 3600 / 24;
    }
    else {
      var endTime1 = (new Date(this.planningEndDate)).getTime();
      var endTime2 = (new Date(this.realEndDate)).getTime();
      this.endDateDifference = (endTime1 - endTime2) / 1000 / 3600 / 24;
    }
  }
}
