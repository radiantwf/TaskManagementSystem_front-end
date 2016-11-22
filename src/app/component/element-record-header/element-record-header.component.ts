import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Task } from './../../model/task';
import { Router } from '@angular/router';
import { AppGlobal } from '../../shared/app-global';
import { MdDialogRef, MdDialog } from '@angular/material';
import { DialogDelElementComponent } from './../dialog-del-element/dialog-del-element.component';
import { DialogStartElementComponent } from './../dialog-start-element/dialog-start-element.component';
import { DialogFinishElementComponent } from './../dialog-finish-element/dialog-finish-element.component';
import { DialogProgressPercentageComponent } from './../dialog-progress-percentage/dialog-progress-percentage.component';
import { DialogCloseElementComponent } from './../dialog-close-element/dialog-close-element.component';

import { TaskService } from './../../service/task.service';

@Component({
  selector: 'app-element-record-header',
  templateUrl: './element-record-header.component.html',
  styleUrls: ['./element-record-header.component.css']
})
export class ElementRecordHeaderComponent implements OnInit {

  @Input() detailFlag = false;
  @Input() taskRecord: Task;
  @Output() detailClicked = new EventEmitter();

  isSeller: boolean = false;
  isOC: boolean = false;
  isTaskAdmin: boolean = false;
  isTaskManager: boolean = false;
  isAdmin: boolean = false;

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
    let user = AppGlobal.getInstance().currentUser;

    this.isAdmin = user.permissions.findIndex(value => (value === 1)) >= 0;
    this.isOC = user.permissions.findIndex(value => (value === 99)) >= 0;
    this.isSeller = user.permissions.findIndex(value => (value === 98)) >= 0;
    this.isTaskAdmin = user.permissions.findIndex(value => (value === 11 || value === 21)) >= 0;
    this.isTaskManager = user.permissions.findIndex(value => (value === 19 || value === 29)) >= 0;

    if (this.taskRecord.status === '新建' && this.isOC) {
      this.processAlert = true;
      this.processAble = true;
    }

    if (this.taskRecord.status === '分配中') {
      if (user.empId === this.taskRecord.primaryOCId) {
        this.processAlert = true;
        this.processAble = true;
      }
      if (this.isTaskAdmin) {
        this.processAble = true;
      }
    }

    if (this.taskRecord.status === '计划中') {
      if (user.empId === this.taskRecord.primaryExecutorId) {
        this.processAlert = true;
        this.processAble = true;
      }
      if (this.isTaskAdmin) {
        this.processAble = true;
      }
    }

    if (this.taskRecord.status === '未开始') {
      if (user.empId === this.taskRecord.primaryExecutorId) {
        this.startAlert = true;
        this.startAble = true;
      }
      if (this.isTaskAdmin) {
        this.startAble = true;
      }
    }
    if (this.taskRecord.status === '进行中') {
      if (user.empId === this.taskRecord.primaryExecutorId) {
        this.progessAble = true;
        this.finishAble = true;
      }
      if (this.isTaskAdmin) {
        this.progessAble = true;
        this.finishAble = true;
      }
    }
    if (this.taskRecord.status !== '关闭') {
      if (this.isOC || this.isAdmin || this.isTaskAdmin) {
        this.closeAble = true;
      }
      if (this.isSeller && user.empId === this.taskRecord.primarySellerId) {
        this.closeAble = true;
      }
    }
    if (this.isAdmin || this.isOC || this.isTaskAdmin) {
      this.editAble = true;
    }
    if (this.isSeller && user.empId === this.taskRecord.primarySellerId) {
      this.editAble = true;
    }
    if (this.isAdmin) {
      this.deleteAble = true;
    } else {
      if (this.taskRecord.status === '新建' || this.taskRecord.status === '分配中') {
        if (user.empId === this.taskRecord.creatorId) {
          this.deleteAble = true;
          this.closeAble = true;
        }
        if (this.isSeller && user.empId === this.taskRecord.primarySellerId) {
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
      if (result != null) {
        let newTask = result as Task;
        newTask.id = this.taskRecord.id;
        this.taskService.strat(newTask)
          .then(() => this.router.navigate(['/']));
      }
    });
  }

  openFinishDialog() {
    this.dialogFinishRef = this.dialog.open(DialogFinishElementComponent, {
      disableClose: false
    });

    this.dialogFinishRef.afterClosed().subscribe(result => {
      this.dialogFinishRef = null;
      if (result != null) {
        let newTask = result as Task;
        newTask.id = this.taskRecord.id;
        this.taskService.finish(newTask)
          .then(() => this.router.navigate(['/']));
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
        let newTask = new Task(this.taskRecord.id, '');
        this.taskService.close(newTask)
          .then(() => this.router.navigate(['/']));
      }
    });
  }

  openProgressDialog() {
    this.dialogProgessRef = this.dialog.open(DialogProgressPercentageComponent, {
      disableClose: false
    });

    this.dialogProgessRef.afterClosed().subscribe(result => {
      this.dialogProgessRef = null;
      if (result != null) {
        let newTask = result as Task;
        newTask.id = this.taskRecord.id;
        this.taskService.progress(newTask)
          .then(() => this.router.navigate(['/']));
      }
    });
  }

  onDetailClicked(event) {
    this.detailClicked.emit(event);
  }
}
