import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Task } from './../../model/task';
import { Employee } from './../../model/employee';
import { TaskService } from './../../service/task.service';
import { EmployeeService } from './../../service/employee.service';
import { AppGlobal } from '../../shared/app-global';
@Component({
  selector: 'edit-element-task',
  templateUrl: './edit-element-task.component.html',
  styleUrls: ['./../element-record-header/element-record-header.component.css', './edit-element-task.component.css']
})
export class EditElementTaskComponent implements OnInit {
  editingTask: Task = new Task('', '');
  employees: Array<Employee>;
  sellers: Array<Employee>;
  OC: Array<Employee>;
  taskManagers: Array<Employee>;
  operationType: string;
  sellerId: string;
  OCId: string;
  taskManagerId: string;

  ocAreaVisibility: boolean;
  taskAreaVisibility: boolean;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private taskService: TaskService,
    private employeeService: EmployeeService) {
  }

  ngOnInit() {
    var user = AppGlobal.getInstance().currentUser;
    if (user != null) {
      this.ocAreaVisibility = user.permissions.findIndex(value => (value == 1
        || value == 11 || value == 19 || value == 21 || value == 29 || value == 99)) >= 0;
      this.taskAreaVisibility = user.permissions.findIndex(value => (value == 1
        || value == 11 || value == 19 || value == 21 || value == 29)) >= 0;
    }
    this.employeeService.getEmployee()
      .then(e => this.employees = e)
      .then(() => this.ProcessEmployees())
    this.activatedRoute.params.subscribe(params => {
      if (typeof (params['tid']) != "undefined" && typeof (params['do']) != "undefined") {
        this.operationType = params['do'];
        this.taskService.getTask(params['tid'])
          .then(task => this.editingTask = task)
          .then(() => {
            this.sellerId = this.editingTask.primarySellerId == null ? '' : this.editingTask.primarySellerId;
            this.OCId = this.editingTask.primaryOCId == null ? AppGlobal.getInstance().currentUser.empId : this.editingTask.primaryOCId;
            this.taskManagerId = this.editingTask.primaryExecutorId == null ? '' : this.editingTask.primaryExecutorId;
          });
      }
    });
  }
  ProcessEmployees() {
    this.sellers = new Array<Employee>();
    this.OC = new Array<Employee>();
    this.taskManagers = new Array<Employee>();
    this.employees.forEach(value => {
      if (value.permissions.findIndex(value => (value == 98)) >= 0) {
        this.sellers.push(value);
      }
      if (value.permissions.findIndex(value => (value == 99)) >= 0) {
        this.OC.push(value);
      }
      if (value.permissions.findIndex(value => (value == 1
        || value == 11 || value == 19 || value == 21 || value == 29)) >= 0) {
        this.taskManagers.push(value);
      }
    });
  }
  addTask() {
    if (!this.editingTask.name || !this.editingTask.resume) { return; }
    this.editingTask.primarySellerId = this.sellerId;
    this.editingTask.primaryOCId = this.OCId;
    this.editingTask.primaryExecutorId = this.taskManagerId;
    this.taskService.create(this.editingTask).then(() => this.router.navigate(['/task/1'])
    );
  }
}
