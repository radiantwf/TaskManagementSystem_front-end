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
    styleUrls: ['./../element-task-header/element-task-header.component.css', './create-element-task.component.css']
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

    isSeller: boolean = false;
    isOC: boolean = false;
    isTaskAdmin: boolean = false;
    isTaskManager: boolean = false;

    constructor(
        private router: Router,
        private taskService: TaskService,
        private employeeService: EmployeeService) {
    }

    ngOnInit() {
        let user = AppGlobal.getInstance().currentUser;
        if (user != null) {
            this.isOC = user.permissions.findIndex(value => (value === 99)) >= 0;
            this.isSeller = user.permissions.findIndex(value => (value === 98)) >= 0;
            this.isTaskAdmin = user.permissions.findIndex(value => (value === 11 || value === 21)) >= 0;
            this.isTaskManager = user.permissions.findIndex(value => (value === 17 || value === 18 || value === 19 || value === 29)) >= 0;
        }
        this.employeeService.getEmployee().then(e => { this.employees = e; this.ProcessEmployees(); });
    }
    ProcessEmployees() {
        this.sellers = new Array<Employee>();
        this.OC = new Array<Employee>();
        this.taskManagers = new Array<Employee>();
        this.sellerId = null;
        this.OCId = null;
        this.taskManagerId = null;
        this.employees.forEach(value => {
            if (value.permissions.findIndex(p => (p === 98)) >= 0) {
                this.sellers.push(value);
                if (value.empId === AppGlobal.getInstance().currentUser.empId) {
                    this.sellerId = value.empId;
                }
            }
            if (value.permissions.findIndex(p => (p === 99)) >= 0) {
                this.OC.push(value);
                if (value.empId === AppGlobal.getInstance().currentUser.empId) {
                    this.OCId = value.empId;
                }
            }
            if (value.permissions.findIndex(p => (p === 1
                || p === 11 || p === 17 || p === 18 || p === 19 || p === 21 || p === 29)) >= 0) {
                this.taskManagers.push(value);
                if (value.empId === AppGlobal.getInstance().currentUser.empId) {
                    this.taskManagerId = value.empId;
                }
            }
        });
    }
    addTask() {
        this.newTask.creatorId = AppGlobal.getInstance().currentUser.empId;
        this.newTask.primarySellerId = this.sellerId;
        this.newTask.primaryOCId = this.OCId;
        this.newTask.primaryExecutorId = this.taskManagerId;
        this.taskService.create(this.newTask).then(() => this.router.navigate(['/task/1'])
        );
    }
}
