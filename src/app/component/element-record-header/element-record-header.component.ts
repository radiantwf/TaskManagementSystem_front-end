import { Component, OnInit, EventEmitter, Optional } from '@angular/core';
import { Task } from './../../model/task';
import { Router } from '@angular/router';
import { AppGlobal } from '../../shared/app-global';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import { DialogDelElementComponent } from './../dialog-del-element/dialog-del-element.component';
import { DialogStartElementComponent } from './../dialog-start-element/dialog-start-element.component';
import { DialogFinishElementComponent } from './../dialog-finish-element/dialog-finish-element.component';
import { DialogProgressPercentageComponent } from './../dialog-progress-percentage/dialog-progress-percentage.component';
import { DialogCloseElementComponent } from './../dialog-close-element/dialog-close-element.component';

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

  processAble: boolean = false;
  processAlert: boolean = false;
  startAble: boolean = false;
  startAlert: boolean = false;
  progessAble: boolean = false;
  finishAble: boolean = false;
  closeAble: boolean = false;
  editAble: boolean = false;
  deleteAble: boolean = false;

  dialogDelRef: MdDialogRef<DialogDelElementComponent>;
  dialogStartRef: MdDialogRef<DialogStartElementComponent>;
  dialogFinishRef: MdDialogRef<DialogFinishElementComponent>;
  dialogProgessRef: MdDialogRef<DialogProgressPercentageComponent>;
  dialogCloseRef: MdDialogRef<DialogCloseElementComponent>;


  constructor(private router: Router, public dialog: MdDialog, private taskService: TaskService) { }

  ngOnInit() {
    var user = AppGlobal.getInstance().currentUser;

    if (this.taskRecord.status == '新建' && user.isOC) {
      this.processAlert = true;
      this.processAble = true;
    }

    if (this.taskRecord.status == '分配中') {
      if (user.empId == this.taskRecord.primaryOCId) {
        this.processAlert = true;
        this.processAble = true;
      }
      if (user.isTaskAdmin) {
        this.processAble = true;
      }
    }

    if (this.taskRecord.status == '计划中') {
      if (user.empId == this.taskRecord.primaryExecutorId) {
        this.processAlert = true;
        this.processAble = true;
      }
      if (user.isTaskAdmin) {
        this.processAble = true;
      }
    }

    if (this.taskRecord.status == '未开始') {
      if (user.empId == this.taskRecord.primaryExecutorId) {
        this.startAlert = true;
        this.startAble = true;
      }
      if (user.isTaskAdmin) {
        this.startAble = true;
      }
    }
    if (this.taskRecord.status == '进行中') {
      if (user.empId == this.taskRecord.primaryExecutorId) {
        this.progessAble = true;
        this.finishAble = true;
      }
      if (user.isTaskAdmin) {
        this.progessAble = true;
        this.finishAble = true;
      }
    }
    if (this.taskRecord.status != '关闭') {
      if (user.isOC || user.isAdmin || user.isTaskAdmin) {
        this.closeAble = true;
      }
      if (user.isSeller && user.empId == this.taskRecord.primarySellerId) {
        this.closeAble = true;
      }
    }
    if (user.isAdmin || user.isOC || user.isTaskAdmin) {
      this.editAble = true;
    }
    if (user.isSeller && user.empId == this.taskRecord.primarySellerId) {
      this.editAble = true;
    }
    if (user.isAdmin) {
      this.deleteAble = true;
    } else {
      if (this.taskRecord.status == '新建' || this.taskRecord.status == '分配中') {
        if (user.empId == this.taskRecord.creatorId) {
          this.deleteAble = true;
          this.closeAble = true;
        }
        if (user.isSeller && user.empId == this.taskRecord.primarySellerId) {
          this.deleteAble = true;
        }
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
  openCloseDialog() {
    this.dialogCloseRef = this.dialog.open(DialogCloseElementComponent, {
      disableClose: false
    });

    this.dialogCloseRef.afterClosed().subscribe(result => {
      this.dialogCloseRef = null;
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