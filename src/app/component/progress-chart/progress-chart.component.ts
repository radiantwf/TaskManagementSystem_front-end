import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'progress-chart',
  templateUrl: './progress-chart.component.html',
  styleUrls: ['./progress-chart.component.css',
    './../element-task-header/element-task-header.component.css'],
  inputs: ['planningBeginDate', 'planningEndDate', 'realBeginDate', 'realEndDate']
})
export class ProgressChartComponent implements OnInit {
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
      let endTime1 = (new Date(this.planningEndDate)).getTime();
      let endTime2 = this.dateNow.getTime();
      this.endDateDifference = (endTime1 - endTime2) / 1000 / 3600 / 24;
    }
    else {
      let endTime1 = (new Date(this.planningEndDate)).getTime();
      let endTime2 = (new Date(this.realEndDate)).getTime();
      this.endDateDifference = (endTime1 - endTime2) / 1000 / 3600 / 24;
    }
  }

}
