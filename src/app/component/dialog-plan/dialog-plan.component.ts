import { Component, OnInit, Optional } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-dialog-plan',
  templateUrl: './dialog-plan.component.html',
  styleUrls: ['./dialog-plan.component.css']
})
export class DialogPlanComponent implements OnInit {
  planningBeginDate: Date;
  planningEndDate: Date;

  constructor( @Optional() public dialogRef: MdDialogRef<DialogPlanComponent>) { }

  ngOnInit() {
  }
  returnValue() {
    if (this.planningBeginDate == null || this.planningEndDate == null) {
      alert('请填写任务计划日期！');
      return;
    }
    let result: [Date, Date] = [null, null];
    result[0] = this.planningBeginDate;
    result[1] = this.planningEndDate;
    this.dialogRef.close(result);
  }
}
