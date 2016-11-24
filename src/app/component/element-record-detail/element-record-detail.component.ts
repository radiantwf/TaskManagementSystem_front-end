import { Component, OnInit } from '@angular/core';
import { Task } from './../../model/task';
import { TaskService } from './../../service/task.service';
import { AppGlobal } from '../../shared/app-global';

@Component({
  selector: 'element-record-detail',
  templateUrl: './element-record-detail.component.html',
  styleUrls: ['./../element-record-header/element-record-header.component.css', './element-record-detail.component.css'],
  inputs: ['taskId']
})
export class ElementRecordDetailComponent implements OnInit {
  taskId: string;
  taskRecord: Task = new Task('', '');

  isSeller: boolean = false;
  isOC: boolean = false;
  isTaskAdmin: boolean = false;
  isTaskManager: boolean = false;
  isAdmin: boolean = false;

  processAlert: boolean = false;

  constructor(private taskService: TaskService) { }

  ngOnInit() {    let user = AppGlobal.getInstance().currentUser;

    this.isAdmin = user.permissions.findIndex(value => (value === 1)) >= 0;
    this.isOC = user.permissions.findIndex(value => (value === 99)) >= 0;
    this.isSeller = user.permissions.findIndex(value => (value === 98)) >= 0;
    this.isTaskAdmin = user.permissions.findIndex(value => (value === 11 || value === 21)) >= 0;
    this.isTaskManager = user.permissions.findIndex(value => (value === 19 || value === 29)) >= 0;

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
    this.taskService.getTask(this.taskId)
      .then(task => this.taskRecord = task);
  }

}
