import { Component, OnInit, EventEmitter, Optional } from '@angular/core';
import { Task } from './../../model/task';
import { Router } from '@angular/router';
import { AppGlobal } from '../../shared/app-global';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import { DelElementComponent } from './../del-element/del-element.component';

@Component({
  selector: 'element-record-header',
  templateUrl: './element-record-header.component.html',
  styleUrls: ['./element-record-header.component.css'],
  inputs: ['taskRecord', 'detailFlag'],
  outputs: ['detailClicked']
})
export class ElementRecordHeaderComponent implements OnInit {

  detailFlag = false;
  taskRecord: Task;
  detailClicked = new EventEmitter();
  processFlag: boolean = false;
  deleteAble: boolean = false;
  dialogRef: MdDialogRef<DelElementComponent>;

  constructor(private router: Router, public dialog: MdDialog) { }

  ngOnInit() {
    var user = AppGlobal.getInstance().currentUser;

    if (this.taskRecord.status == '新建' && user.permissions.findIndex(value => (value == 1
      || value == 11 || value == 21 || value == 99)) >= 0) {
      this.processFlag = true;
    } else {
      this.processFlag = false;
    }
    if (this.taskRecord.status == '新建' && user.empId == this.taskRecord.creatorId) {
      this.deleteAble = true;
    } else {
      this.deleteAble = false;
    }
  }

  openDialog() {
    this.dialogRef = this.dialog.open(DelElementComponent, {
      disableClose: false
    });

    this.dialogRef.afterClosed().subscribe(result => {
      console.log('result: ' + result);
      this.dialogRef = null;
    });
  }

  onDetailClicked(event) {
    this.detailClicked.emit(event);
  }
}

// @Component({
//   selector: 'del-task-dialog',
//   template: `
//   <button type="button" (click)="dialogRef.close('yes')">Yes</button>
//   <button type="button" (click)="dialogRef.close('no')">No</button>
//   `
// })
// export class DelTaskDialog {
//   constructor(public dialogRef: MdDialogRef<DelTaskDialog>) { }
// }