import { Component, OnInit, Input } from '@angular/core';
import { Task } from './../../model/task';
import { TaskService } from './../../service/task.service';
import { Router } from '@angular/router';
import { AppGlobal } from '../../shared/app-global';
import { MdDialogRef, MdDialog } from '@angular/material';
import { DialogPlanComponent } from './../dialog-plan/dialog-plan.component';
import { DialogAssignTaskComponent } from './../dialog-assign-task/dialog-assign-task.component';
import { DialogRefuseTaskComponent } from './../dialog-refuse-task/dialog-refuse-task.component';

@Component({
  selector: 'element-record-detail',
  templateUrl: './element-record-detail.component.html',
  styleUrls: ['./../element-record-header/element-record-header.component.css', './element-record-detail.component.css']
})
export class ElementRecordDetailComponent implements OnInit {
  @Input() taskId: string;
  taskRecord: Task = new Task('', '');

  isSeller: boolean = false;
  isOC: boolean = false;
  isTaskAdmin: boolean = false;
  isTaskManager: boolean = false;
  isAdmin: boolean = false;

  dialogPlanRef: MdDialogRef<DialogPlanComponent>;
  dialogAssignRef: MdDialogRef<DialogAssignTaskComponent>;
  dialogRefuseRef: MdDialogRef<DialogRefuseTaskComponent>;

  processAlert: boolean = false;

  constructor(private taskService: TaskService, public dialog: MdDialog, private router: Router) { }

  ngOnInit() {
    let user = AppGlobal.getInstance().currentUser;

    this.isAdmin = user.permissions.findIndex(value => (value === 1)) >= 0;
    this.isOC = user.permissions.findIndex(value => (value === 99)) >= 0;
    this.isSeller = user.permissions.findIndex(value => (value === 98)) >= 0;
    this.isTaskAdmin = user.permissions.findIndex(value => (value === 11 || value === 21)) >= 0;
    this.isTaskManager = user.permissions.findIndex(value => (value === 19 || value === 29)) >= 0;
    this.taskService.getTask(this.taskId)
      .then(task => this.taskRecord = task)
      .then(() => {
        if (this.taskRecord.status === '新建' && this.isOC) {
          this.processAlert = true;
        }
        if (this.taskRecord.status === '分配中') {
          if (user.empId === this.taskRecord.primaryOCId) {
            this.processAlert = true;
          }
        }
        if (this.taskRecord.status === '计划中') {
          if (user.empId === this.taskRecord.primaryExecutorId) {
            this.processAlert = true;
          }
        }
      });
  }
  onRefuseButtenClick() {
    this.openRefuseDialog();
  }
  onAcceptButtenClick() {
    if (this.taskRecord.status === '新建' || this.taskRecord.status === '分配中') {
      this.openAssignDialog();
    }
    if (this.taskRecord.status === '计划中') {
      this.openPlanDialog();
    }
  }
  openPlanDialog() {
    this.dialogPlanRef = this.dialog.open(DialogPlanComponent, {
      disableClose: false
    });
    this.dialogPlanRef.componentInstance.planningBeginDate = this.taskRecord.planningBeginDate;
    this.dialogPlanRef.componentInstance.planningEndDate = this.taskRecord.planningEndDate;
    this.dialogPlanRef.afterClosed().subscribe(result => {
      this.dialogPlanRef = null;
      if (result != null) {
        let editingTask = new Task(this.taskId, null);
        editingTask.planningBeginDate = result[0];
        editingTask.planningEndDate = result[1];
        this.taskService.update(editingTask)
          .then(
          // () => this.router.navigate([this.router.url]) 刷新页面
          );
      }
    });
  }
  openAssignDialog() {
    this.dialogAssignRef = this.dialog.open(DialogAssignTaskComponent, {
      disableClose: false
    });

    this.dialogAssignRef.componentInstance.primaryOCId = this.taskRecord.primaryOCId;
    this.dialogAssignRef.componentInstance.primaryExecutorId = this.taskRecord.primaryExecutorId;
    this.dialogAssignRef.componentInstance.otherExecutors = this.taskRecord.otherExecutors;
    this.dialogAssignRef.afterClosed().subscribe(result => {
      this.dialogAssignRef = null;
      if (result != null) {
        let editingTask = new Task(this.taskId, null);
        editingTask.primaryOCId = result[0];
        editingTask.primaryExecutorId = result[1];
        editingTask.otherExecutors = result[2];
        this.taskService.update(editingTask)
          .then(
          // () => this.router.navigate([this.router.url]) 刷新页面
          );
      }
    });
  }
  openRefuseDialog() {
    this.dialogRefuseRef = this.dialog.open(DialogRefuseTaskComponent, {
      disableClose: false
    });

    this.dialogRefuseRef.afterClosed().subscribe(result => {
      this.dialogRefuseRef = null;
      if (result != null) {
        this.taskService.refuse(this.taskId, result)
          .then(
          // () => this.router.navigate([this.router.url]) 刷新页面
          );
      }
    });
  }
}
