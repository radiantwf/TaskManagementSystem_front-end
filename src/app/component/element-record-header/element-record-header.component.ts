import { Component, OnInit, EventEmitter, Optional } from '@angular/core';
import { Task } from './../../model/task';
import { Router } from '@angular/router';
import { AppGlobal } from '../../shared/app-global';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import { DialogDelElementComponent } from './../dialog-del-element/dialog-del-element.component';
import { DialogStartElementComponent } from './../dialog-start-element/dialog-start-element.component';
import { DialogFinishElementComponent } from './../dialog-finish-element/dialog-finish-element.component';
import { DialogProgressPercentageComponent } from './../dialog-progress-percentage/dialog-progress-percentage.component';

import { TaskService } from './../../service/task.service';

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
  dialogDelRef: MdDialogRef<DialogDelElementComponent>;
  dialogStartRef: MdDialogRef<DialogStartElementComponent>;
  dialogFinishRef: MdDialogRef<DialogFinishElementComponent>;
  dialogProgessRef: MdDialogRef<DialogProgressPercentageComponent>;

  constructor(private router: Router, public dialog: MdDialog, private taskService: TaskService) { }

  ngOnInit() {
    var user = AppGlobal.getInstance().currentUser;

    if (this.taskRecord.status == '新建' && user.permissions.findIndex(value => (value == 1
      || value == 11 || value == 21 || value == 99)) >= 0) {
      this.processFlag = true;
    } else {
      this.processFlag = false;
    }

    if (user.permissions.findIndex(value => (value == 1)) >= 0) {
      this.deleteAble = true;
    } else {
      if (this.taskRecord.status == '新建' && user.empId == this.taskRecord.creatorId) {
        this.deleteAble = true;
      } else {
        this.deleteAble = false;
      }
    }
  }

  openDelDialog() {
    this.dialogDelRef = this.dialog.open(DialogDelElementComponent, {
      disableClose: false
    });

    this.dialogDelRef.afterClosed().subscribe(result => {
      this.dialogDelRef = null;
      if (result) {
        this.taskService.delete(this.taskRecord.id)
          .then(() => this.router.navigate(['/']));
      }
    });
  }

  openStartDialog() {
    this.dialogStartRef = this.dialog.open(DialogStartElementComponent, {
      disableClose: false
    });

    this.dialogStartRef.afterClosed().subscribe(result => {
      this.dialogStartRef = null;
      if (result) {
      }
    });
  }

  openFinishDialog() {
    this.dialogFinishRef = this.dialog.open(DialogFinishElementComponent, {
      disableClose: false
    });

    this.dialogFinishRef.afterClosed().subscribe(result => {
      this.dialogFinishRef = null;
      if (result) {
      }
    });
  }

  openProgressDialog() {
    this.dialogProgessRef = this.dialog.open(DialogProgressPercentageComponent, {
      disableClose: false
    });

    this.dialogProgessRef.afterClosed().subscribe(result => {
      this.dialogProgessRef = null;
      if (result) {
      }
    });
  }

  onDetailClicked(event) {
    this.detailClicked.emit(event);
  }
}