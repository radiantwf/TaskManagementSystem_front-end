import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Task } from './../../model/task';
import { Employee } from './../../model/employee';
import { TaskService } from './../../service/task.service';
import { EmployeeService } from './../../service/employee.service';
import { AppGlobal } from '../../shared/app-global';

@Component({
  selector: 'create-element-task',
  templateUrl: './create-element-task.component.html',
  styleUrls: ['./../element-record-header/element-record-header.component.css', './create-element-task.component.css']
})
export class CreateElementTaskComponent implements OnInit {
  newTask: Task = new Task('', '');
  employees: Array<Employee>;
  sellers: Array<Employee>;
  OC: Array<Employee>;
  taskManagers: Array<Employee>;

  sellerId: string;
  OCId: string;
  taskManagerId: string;

  sellerAreaVisibility: boolean;
  ocAreaVisibility: boolean;
  taskAreaVisibility: boolean;

  constructor(
    private router: Router, private taskService: TaskService, private employeeService: EmployeeService) {
  }

  ngOnInit() {
    var user = AppGlobal.getInstance().currentUser;
    if (user != null) {
      this.sellerAreaVisibility = user.permissions.findIndex(value => (value == 1
        || value == 11 || value == 19 || value == 21 || value == 29
        || value == 98 || value == 99)) >= 0;
      this.ocAreaVisibility = user.permissions.findIndex(value => (value == 1
        || value == 11 || value == 19 || value == 21 || value == 29 || value == 99)) >= 0;
      this.taskAreaVisibility = user.permissions.findIndex(value => (value == 1
        || value == 11 || value == 19 || value == 21 || value == 29)) >= 0;
    }
    this.employeeService.getEmployee().then(e => { this.employees = e; this.ProcessEmployees(); })

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
    if (!this.newTask.name || !this.newTask.resume) { return; }
    this.newTask.id = 'temp';
    this.newTask.creatorId = AppGlobal.getInstance().currentUser.empId;
    this.newTask.primarySellerId = this.sellerId;
    this.newTask.primaryOCId = this.OCId;
    this.newTask.primaryExecutorId = this.taskManagerId
    this.taskService.create(this.newTask).then(() => this.router.navigate(['/task'])
    );
  }
}
