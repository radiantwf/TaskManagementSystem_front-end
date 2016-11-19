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
  dialogRef: MdDialogRef<DialogDelElementComponent>;

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
    this.dialogRef = this.dialog.open(DialogDelElementComponent, {
      disableClose: false
    });

    this.dialogRef.afterClosed().subscribe(result => {
      this.dialogRef = null;
      if (result) {
        this.taskService.delete(this.taskRecord.id)
          .then(() => this.router.navigate(['/']));
      }
    });
  }

  onDetailClicked(event) {
    this.detailClicked.emit(event);
  }
}