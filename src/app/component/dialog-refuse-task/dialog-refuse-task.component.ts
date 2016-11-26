import { Component, OnInit, Optional } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-dialog-refuse-task',
  templateUrl: './dialog-refuse-task.component.html',
  styleUrls: ['./dialog-refuse-task.component.css']
})
export class DialogRefuseTaskComponent implements OnInit {
  reason: string = '';
  constructor( @Optional() public dialogRef: MdDialogRef<DialogRefuseTaskComponent>) { }

  ngOnInit() {
  }

  returnValue() {
    if (this.reason == null || this.reason === '') {
      alert('请填写拒绝理由！');
      return;
    }
    this.dialogRef.close(this.reason);
  }
}
