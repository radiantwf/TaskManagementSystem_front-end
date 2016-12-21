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
  selector: 'app-element-task-header',
  templateUrl: './element-task-header.component.html',
  styleUrls: ['./element-task-header.component.css']
})
export class ElementTaskHeaderComponent implements OnInit {

  @Input() detailFlag = false;
  @Input() taskRecord: Task;
  @Output() detailClicked = new EventEmitter();

  statusStyle: string = 'error';
  isSeller: boolean = false;
  isOC: boolean = false;
  isTaskAdmin: boolean = false;
  isTaskManager: boolean = false;
  isAdmin: boolean = false;
  accessAlert: boolean = false;
  refuseAlert: boolean = false;
  startAlert: boolean = false;
  menuAlert: boolean = false;
  startAble: boolean = false;
  progessAble: boolean = false;
  finishAble: boolean = false;
  closeAble: boolean = false;
  editAble: boolean = false;
  deleteAble: boolean = false;
  today: Date = new Date(Date.parse(new Date(Date.now()).toLocaleDateString()));
  dialogDelRef: MdDialogRef<DialogDelElementComponent>;
  dialogStartRef: MdDialogRef<DialogStartElementComponent>;
  dialogFinishRef: MdDialogRef<DialogFinishElementComponent>;
  dialogProgessRef: MdDialogRef<DialogProgressPercentageComponent>;
  dialogCloseRef: MdDialogRef<DialogCloseElementComponent>;
  info1HiddenFlag: boolean = true;
  info2HiddenFlag: boolean = true;
  info3HiddenFlag: boolean = false;
  info1Date: Date;
  info1Text: string;
  info2DateSpan: number = -1;
  info2Text: string;
  info3DateSpan: number = -1;
  info3Text: string;
  constructor(private router: Router, public dialog: MdDialog, private taskService: TaskService) { }

  ngOnInit() {
    let user = AppGlobal.getInstance().currentUser;

    this.isAdmin = user.permissions.findIndex(value => (value === 1)) >= 0;
    this.isOC = user.permissions.findIndex(value => (value === 99)) >= 0;
    this.isSeller = user.permissions.findIndex(value => (value === 98)) >= 0;
    this.isTaskAdmin = user.permissions.findIndex(value => (value === 11 || value === 21)) >= 0;
    this.isTaskManager = user.permissions.findIndex(value => (value === 17 || value === 18 || value === 19 || value === 29)) >= 0;

    this.info3HiddenFlag = false;
    this.info3Text = this.taskRecord.status;
    this.info3DateSpan = -1;
    if (this.taskRecord.status === '新建' || this.taskRecord.status === '分配中'
      || this.taskRecord.status === '计划中' || this.taskRecord.status === '未开始') {
      this.statusStyle = 'notstart';
    }
    if (this.taskRecord.status === '进行中') {
      if (this.taskRecord.planningEndDate <= this.today) {
        this.statusStyle = 'ongoing';
      } else {
        this.statusStyle = 'overtime';
      }
    }

    if ((this.taskRecord.status === '未开始' || this.taskRecord.status === '进行中')
      && this.taskRecord.planningBeginDate != null && this.taskRecord.planningEndDate != null) {
      this.info1HiddenFlag = false;
      this.info1Date = this.taskRecord.planningEndDate;
      this.info1Text = '计划完成时间';

      this.info2HiddenFlag = false;
      this.info2DateSpan = Math.ceil(((new Date(this.taskRecord.planningEndDate)).getTime()
        - (new Date(this.taskRecord.planningBeginDate)).getTime()) / 86400000) + 1;
      this.info2Text = '计划用时';
      if (this.today > this.taskRecord.planningEndDate) {
        this.info3DateSpan = Math.floor((this.today.getTime() - (new Date(this.taskRecord.planningEndDate)).getTime()) / 86400000);
        this.info3Text = '超时';
      }
    }
    if (this.taskRecord.status === '已完成' || this.taskRecord.status === '已关闭') {
      if (this.taskRecord.realBeginDate == null || this.taskRecord.realEndDate == null || this.taskRecord.planningEndDate == null) {
        this.statusStyle = 'finish';
      } else if (this.taskRecord.realEndDate <= this.taskRecord.planningEndDate) {
        this.statusStyle = 'finish';
        this.info2HiddenFlag = false;
        this.info2DateSpan = Math.ceil(((new Date(this.taskRecord.realEndDate)).getTime()
          - (new Date(this.taskRecord.realBeginDate)).getTime()) / 86400000) + 1;
        this.info2Text = '实际用时';
      } else {
        this.statusStyle = 'overtime';
        this.info2HiddenFlag = false;
        this.info2DateSpan = Math.ceil(((new Date(this.taskRecord.realEndDate)).getTime()
          - (new Date(this.taskRecord.realBeginDate)).getTime()) / 86400000) + 1;
        this.info2Text = '实际用时';
        this.info3DateSpan = Math.floor(((new Date(this.taskRecord.realEndDate)).getTime()
          - (new Date(this.taskRecord.planningEndDate)).getTime()) / 86400000);
        this.info3Text = '超时';
      }
    }

    if (this.taskRecord.status === '新建' && this.isOC && this.taskRecord.refuseStatus == null) {
      this.accessAlert = true;
    }
    if (this.taskRecord.status === '分配中' && this.taskRecord.refuseStatus == null) {
      if (user.empId === this.taskRecord.primaryOCId) {
        this.accessAlert = true;
      }
    }
    if (this.taskRecord.status === '计划中' && this.taskRecord.refuseStatus == null) {
      if (user.empId === this.taskRecord.primaryExecutorId) {
        this.accessAlert = true;
      }
    }
    if (this.taskRecord.refuseStatus != null) {
      if (user.empId === this.taskRecord.primarySellerId) {
        this.refuseAlert = true;
      }
    }
    if (this.taskRecord.status === '未开始' && this.taskRecord.refuseStatus == null) {
      if (user.empId === this.taskRecord.primaryExecutorId) {
        this.startAble = true;
      }
      if (this.isTaskAdmin) {
        this.startAble = true;
      }
    }
    if (this.taskRecord.status === '进行中' && this.taskRecord.refuseStatus == null) {
      if (user.empId === this.taskRecord.primaryExecutorId) {
        this.progessAble = true;
        this.finishAble = true;
      }
      if (this.isTaskAdmin) {
        this.finishAble = true;
      }
    }
    if (this.taskRecord.status !== '已关闭') {
      if (this.isOC || this.isAdmin || this.isTaskAdmin) {
        this.closeAble = true;
      }
      if (this.isSeller && user.empId === this.taskRecord.primarySellerId) {
        this.closeAble = true;
      }
    }
    if (this.taskRecord.status !== '已关闭' && this.taskRecord.refuseStatus == null) {
      if (this.isAdmin || this.isOC || this.isTaskAdmin) {
        this.editAble = true;
      }
      if (this.isSeller && user.empId === this.taskRecord.primarySellerId) {
        this.editAble = true;
      }
    }
    if (this.isAdmin) {
      this.deleteAble = true;
    } else {
      if (this.taskRecord.status === '新建' || this.taskRecord.status === '分配中' || this.taskRecord.status === '计划中') {
        if (user.empId === this.taskRecord.creatorId) {
          this.deleteAble = true;
          this.closeAble = true;
        }
        if (this.isSeller && user.empId === this.taskRecord.primarySellerId) {
          this.deleteAble = true;
        }
      }
    }
    this.startAlert = this.startAble;
    this.menuAlert = this.startAlert;
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
