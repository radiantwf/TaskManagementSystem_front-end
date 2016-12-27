import { Component, OnInit, Optional } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { Task } from './../../model/task';

@Component({
  selector: 'app-dialog-finish-element',
  templateUrl: './dialog-finish-element.component.html',
  styleUrls: ['./dialog-finish-element.component.css']
})
export class DialogFinishElementComponent implements OnInit {
  realEndDate: string;
  localOffset: number = new Date().getTimezoneOffset() * 60000;

  constructor( @Optional() public dialogRef: MdDialogRef<DialogFinishElementComponent>) { }

  ngOnInit() {
  }
  comfirm() {
    if (this.realEndDate == null || this.realEndDate === '') {
      alert('请填写实际完成日期！');
      return;
    }
    let task = new Task(null, null);
    task.realEndDate = new Date(new Date(Date.parse(this.realEndDate)).getTime() + this.localOffset);
    this.dialogRef.close(task);
  }
}
