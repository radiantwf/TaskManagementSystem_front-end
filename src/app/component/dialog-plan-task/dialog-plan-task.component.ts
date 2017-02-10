import { Component, OnInit, Optional } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-dialog-plan-task',
  templateUrl: './dialog-plan-task.component.html',
  styleUrls: ['../dialog/dialog.component.css',
    './dialog-plan-task.component.css']
})
export class DialogPlanTaskComponent implements OnInit {
  planningBeginDate: string;
  planningEndDate: string;
  localOffset: number = new Date().getTimezoneOffset() * 60000;

  constructor( @Optional() public dialogRef: MdDialogRef<DialogPlanTaskComponent>) { }

  ngOnInit() {
  }
  returnValue() {
    if (this.planningBeginDate == null || this.planningEndDate == null
      || this.planningBeginDate === '' || this.planningEndDate === '') {
      alert('请填写任务计划日期！');
      return;
    }
    let result: [Date, Date] = [null, null];
    result[0] = new Date(new Date(Date.parse(this.planningBeginDate)).getTime() + this.localOffset);
    result[1] = new Date(new Date(Date.parse(this.planningEndDate)).getTime() + this.localOffset);
    this.dialogRef.close(result);
  }
}
