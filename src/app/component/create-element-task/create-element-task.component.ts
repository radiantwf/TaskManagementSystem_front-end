import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Task } from './../../model/task';
import { Project } from './../../model/project';
import { Product } from './../../model/product';
import { Employee } from './../../model/employee';

import { TaskService } from './../../service/task.service';
import { ProjectService } from './../../service/project.service';
import { ProductService } from './../../service/product.service';
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
    projects: Array<Project>;
    products: Array<Product>;
    sellerId: string;
    OCId: string;
    taskManagerId: string;

    isSeller: boolean = false;
    isOC: boolean = false;
    isTaskAdmin: boolean = false;
    isTaskManager: boolean = false;
    newRequiringEndDate: string;
    newPlanningBeginDate: string;
    newPlanningEndDate: string;
    localOffset: number = new Date().getTimezoneOffset() * 60000;

    constructor(
        private router: Router,
        private taskService: TaskService,
        private employeeService: EmployeeService,
        private projectService: ProjectService,
        private productService: ProductService) {
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
        this.projectService.getAllProjects().then(p => this.projects = p);
        this.productService.getAllProducts().then(p => this.products = p);
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

        if (this.newRequiringEndDate != null && this.newRequiringEndDate !== undefined && this.newRequiringEndDate !== '') {
            this.newTask.requiringEndDate = new Date(new Date(Date.parse(this.newRequiringEndDate)).getTime() + this.localOffset);
        }
        if (this.newPlanningBeginDate != null && this.newPlanningBeginDate !== undefined && this.newPlanningBeginDate !== '') {
            this.newTask.planningBeginDate = new Date(new Date(Date.parse(this.newPlanningBeginDate)).getTime() + this.localOffset);
        }
        if (this.newPlanningEndDate != null && this.newPlanningEndDate !== undefined && this.newPlanningEndDate !== '') {
            this.newTask.planningEndDate = new Date(new Date(Date.parse(this.newPlanningEndDate)).getTime() + this.localOffset);
        }
        this.taskService.create(this.newTask).then(() => this.router.navigate(['/task/1'])
        );
    }
}
