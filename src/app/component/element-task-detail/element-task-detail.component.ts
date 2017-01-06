import { Component, OnInit, Input } from '@angular/core';
import { Task } from './../../model/task';
import { TaskService } from './../../service/task.service';
import { UserService } from './../../service/user.service';
import { Router } from '@angular/router';
import { AppGlobal } from '../../shared/app-global';
import { MdDialogRef, MdDialog } from '@angular/material';
import { DialogPlanTaskComponent } from './../dialog-plan-task/dialog-plan-task.component';
import { DialogAssignTaskComponent } from './../dialog-assign-task/dialog-assign-task.component';
import { DialogRefuseTaskComponent } from './../dialog-refuse-task/dialog-refuse-task.component';

@Component({
  selector: 'app-element-task-detail',
  templateUrl: './element-task-detail.component.html',
  styleUrls: ['./../element-task-header/element-task-header.component.css', './element-task-detail.component.css']
})
export class ElementTaskDetailComponent implements OnInit {
  @Input() taskId: string;
  taskRecord: Task = new Task('', '');

  isSeller: boolean = false;
  isOC: boolean = false;
  isTaskAdmin: boolean = false;
  isTaskManager: boolean = false;
  isAdmin: boolean = false;

  dialogPlanRef: MdDialogRef<DialogPlanTaskComponent>;
  dialogAssignRef: MdDialogRef<DialogAssignTaskComponent>;
  dialogRefuseRef: MdDialogRef<DialogRefuseTaskComponent>;

  accessAlert: boolean = false;
  refuseAlert: boolean = false;
  localOffset: number = new Date().getTimezoneOffset() * 60000;

  constructor(private taskService: TaskService, private userService: UserService, public dialog: MdDialog, private router: Router) { }

  ngOnInit() {
    let user = this.userService.currentUser;

    this.isAdmin = user.permissions.findIndex(value => (value === 1)) >= 0;
    this.isOC = user.permissions.findIndex(value => (value === 99)) >= 0;
    this.isSeller = user.permissions.findIndex(value => (value === 98)) >= 0;
    this.isTaskAdmin = user.permissions.findIndex(value => (value === 11 || value === 21)) >= 0;
    this.isTaskManager = user.permissions.findIndex(value => (value === 17 || value === 18 || value === 19 || value === 29)) >= 0;
    this.taskService.getTask(this.taskId)
      .then(task => this.taskRecord = task)
      .then(() => {
        if (this.taskRecord.status === '新建' && this.isOC && this.taskRecord.refuseStatus == null) {
          this.accessAlert = true;
        }
        if (this.taskRecord.status === '分配中' && this.isOC && this.taskRecord.refuseStatus == null) {
          this.accessAlert = true;
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
      });
  }
  onActiveButtonClick() {
    let newTask = new Task(this.taskRecord.id, null);
    this.taskService.update(newTask)
      .then(() => this.router.navigate(['/']));
  }
  onEditAndActiveButtonClick() {
    this.router.navigate(['/task', this.taskRecord.id, 'edit']);
  }
  onCloseButtonClick() {
    let newTask = new Task(this.taskRecord.id, null);
    this.taskService.close(newTask)
      .then(() => this.router.navigate(['/']));
  }
  onRefuseButtonClick() {
    this.openRefuseDialog();
  }
  onAcceptButtonClick() {
    if (this.taskRecord.status === '新建' || this.taskRecord.status === '分配中') {
      this.openAssignDialog();
    }
    if (this.taskRecord.status === '计划中') {
      this.openPlanDialog();
    }
  }
  openPlanDialog() {
    this.dialogPlanRef = this.dialog.open(DialogPlanTaskComponent, {
      disableClose: false
    });
    if (this.taskRecord.planningBeginDate != null && this.taskRecord.planningBeginDate !== undefined) {
      this.dialogPlanRef.componentInstance.planningBeginDate = new Date(new Date(this.taskRecord.planningBeginDate).getTime()
        - this.localOffset).toISOString().substring(0, 10);
    }
    if (this.taskRecord.planningEndDate != null && this.taskRecord.planningEndDate !== undefined) {
      this.dialogPlanRef.componentInstance.planningEndDate = new Date(new Date(this.taskRecord.planningEndDate).getTime()
        - this.localOffset).toISOString().substring(0, 10);
    }
    this.dialogPlanRef.afterClosed().subscribe(result => {
      this.dialogPlanRef = null;
      if (result != null) {
        let editingTask = new Task(this.taskId, null);
        editingTask.planningBeginDate = result[0];
        editingTask.planningEndDate = result[1];
        this.taskService.update(editingTask)
          .then(() => this.router.navigate(['/']));
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
          .then(() => this.router.navigate(['/']));
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
        let editingTask = new Task(this.taskId, null);
        editingTask.refuseReason = result;
        this.taskService.refuse(editingTask)
          .then(() => this.router.navigate(['/']));
      }
    });
  }
}
