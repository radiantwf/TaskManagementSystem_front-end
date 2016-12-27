import { Component, OnInit, Optional } from '@angular/core';
import { MdDialogRef, MdDialog } from '@angular/material';
import { Task } from './../../model/task';

@Component({
  selector: 'app-dialog-start-element',
  templateUrl: './dialog-start-element.component.html',
  styleUrls: ['./dialog-start-element.component.css']
})
export class DialogStartElementComponent implements OnInit {
  realBeginDate: string;
  localOffset: number = new Date().getTimezoneOffset() * 60000;

  constructor( @Optional() public dialogRef: MdDialogRef<DialogStartElementComponent>) { }

  ngOnInit() {
  }

  comfirm() {
    if (this.realBeginDate == null || this.realBeginDate === '') {
      alert('请填写实际完成日期！');
      return;
    }
    let task = new Task(null, null);
    task.realBeginDate = new Date(new Date(Date.parse(this.realBeginDate)).getTime() + this.localOffset);
    this.dialogRef.close(task);
  }
}
