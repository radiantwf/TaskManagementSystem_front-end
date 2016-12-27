import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Task } from './../../model/task';
import { Employee } from './../../model/employee';
import { TaskService } from './../../service/task.service';
import { EmployeeService } from './../../service/employee.service';
import { AppGlobal } from '../../shared/app-global';
@Component({
    selector: 'app-edit-element-task',
    templateUrl: './edit-element-task.component.html',
    styleUrls: ['./../element-task-header/element-task-header.component.css', './edit-element-task.component.css']
})
export class EditElementTaskComponent implements OnInit {
    srcTask: Task = new Task('', '');
    editingTask: Task = new Task('', null);
    refuseAlert: boolean = false;
    employees: Array<Employee>;
    sellers: Array<Employee>;
    OC: Array<Employee>;
    taskManagers: Array<Employee>;
    operationType: string;
    isSeller: boolean = false;
    isOC: boolean = false;
    isTaskAdmin: boolean = false;
    isTaskManager: boolean = false;
    isAdmin: boolean = false;
    requiringEndDate: string = null;
    planningBeginDate: string = null;
    planningEndDate: string = null;
    realBeginDate: string = null;
    realEndDate: string = null;
    srcRequiringEndDate: string = null;
    srcPlanningBeginDate: string = null;
    srcPlanningEndDate: string = null;
    srcRealBeginDate: string = null;
    srcRealEndDate: string = null;
    localOffset: number = new Date().getTimezoneOffset() * 60000;
    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private taskService: TaskService,
        private employeeService: EmployeeService) {
    }

    ngOnInit() {
        let user = AppGlobal.getInstance().currentUser;
        if (user != null) {
            this.isAdmin = user.permissions.findIndex(value => (value === 1)) >= 0;
            this.isOC = user.permissions.findIndex(value => (value === 99)) >= 0;
            this.isSeller = user.permissions.findIndex(value => (value === 98)) >= 0;
            this.isTaskAdmin = user.permissions.findIndex(value => (value === 11 || value === 21)) >= 0;
            this.isTaskManager = user.permissions.findIndex(value => (value === 17 || value === 18 || value === 19 || value === 29)) >= 0;
        }
        this.employeeService.getEmployee()
            .then(e => this.employees = e)
            .then(() => this.ProcessEmployees());
        this.activatedRoute.params.subscribe(params => {
            if (typeof (params['tid']) !== 'undefined' && typeof (params['do']) !== 'undefined') {
                this.operationType = params['do'];
                this.taskService.getTask(params['tid'])
                    .then(task => this.srcTask = task)
                    .then(() => {
                        if (this.srcTask.requiringEndDate != null && this.srcTask.requiringEndDate !== undefined) {
                            this.srcRequiringEndDate = new Date(new Date(this.srcTask.requiringEndDate).getTime()
                                - this.localOffset).toISOString().substring(0, 10);
                            this.requiringEndDate = this.srcRequiringEndDate;
                        }
                        if (this.srcTask.planningBeginDate != null && this.srcTask.planningBeginDate !== undefined) {
                            this.srcPlanningBeginDate = new Date(new Date(this.srcTask.planningBeginDate).getTime()
                                - this.localOffset).toISOString().substring(0, 10);
                            this.planningBeginDate = this.srcPlanningBeginDate;
                        }
                        if (this.srcTask.planningEndDate != null && this.srcTask.planningEndDate !== undefined) {
                            this.srcPlanningEndDate = new Date(new Date(this.srcTask.planningEndDate).getTime()
                                - this.localOffset).toISOString().substring(0, 10);
                            this.planningEndDate = this.srcPlanningEndDate;
                        }
                        if (this.srcTask.realBeginDate != null && this.srcTask.realBeginDate !== undefined) {
                            this.srcRealBeginDate = new Date(new Date(this.srcTask.realBeginDate).getTime()
                                - this.localOffset).toISOString().substring(0, 10);
                            this.realBeginDate = this.srcRealBeginDate;
                        }
                        if (this.srcTask.realEndDate != null && this.srcTask.realEndDate !== undefined) {
                            this.srcRealEndDate = new Date(new Date(this.srcTask.realEndDate).getTime()
                                - this.localOffset).toISOString().substring(0, 10);
                            this.realEndDate = this.srcRealEndDate;
                        }
                        if (this.srcTask.refuseStatus != null) {
                            this.refuseAlert = true;
                        }
                    });
            }
        });
    }
    ProcessEmployees() {
        this.sellers = new Array<Employee>();
        this.OC = new Array<Employee>();
        this.taskManagers = new Array<Employee>();
        this.employees.forEach(employee => {
            if (employee.permissions.findIndex(value => (value === 98)) >= 0) {
                this.sellers.push(employee);
            }
            if (employee.permissions.findIndex(value => (value === 99)) >= 0) {
                this.OC.push(employee);
            }
            if (employee.permissions.findIndex(value => (value === 1
                || value === 11 || value === 17 || value === 18 || value === 19 || value === 21 || value === 29)) >= 0) {
                this.taskManagers.push(employee);
            }
        });
    }
    editTask() {
        this.editingTask.id = this.srcTask.id;
        // requiringEndDate
        if (this.srcRequiringEndDate == null) {
            if (this.requiringEndDate !== null && this.requiringEndDate !== '') {
                this.editingTask.requiringEndDate = new Date(new Date(Date.parse(this.requiringEndDate)).getTime() + this.localOffset);
            }
        } else if (this.requiringEndDate == null || this.requiringEndDate === '') {
            this.editingTask.requiringEndDate = null;
        } else if (this.requiringEndDate !== this.srcRequiringEndDate) {
            this.editingTask.requiringEndDate = new Date(new Date(Date.parse(this.requiringEndDate)).getTime() + this.localOffset);
        }
        // planningBeginDate
        if (this.srcPlanningBeginDate == null) {
            if (this.planningBeginDate !== null && this.planningBeginDate !== '') {
                this.editingTask.planningBeginDate = new Date(new Date(Date.parse(this.planningBeginDate)).getTime() + this.localOffset);
            }
        } else if (this.planningBeginDate == null || this.planningBeginDate === '') {
            this.editingTask.planningBeginDate = null;
        } else if (this.planningBeginDate !== this.srcPlanningBeginDate) {
            this.editingTask.planningBeginDate = new Date(new Date(Date.parse(this.planningBeginDate)).getTime() + this.localOffset);
        }
        // planningEndDate
        if (this.srcPlanningEndDate == null) {
            if (this.planningEndDate !== null && this.planningEndDate !== '') {
                this.editingTask.planningEndDate = new Date(new Date(Date.parse(this.planningEndDate)).getTime() + this.localOffset);
            }
        } else if (this.planningEndDate == null || this.planningEndDate === '') {
            this.editingTask.planningEndDate = null;
        } else if (this.planningEndDate !== this.srcPlanningEndDate) {
            this.editingTask.planningEndDate = new Date(new Date(Date.parse(this.planningEndDate)).getTime() + this.localOffset);
        }
        // realBeginDate
        if (this.srcRealBeginDate == null) {
            if (this.realBeginDate !== null && this.realBeginDate !== '') {
                this.editingTask.realBeginDate = new Date(new Date(Date.parse(this.realBeginDate)).getTime() + this.localOffset);
            }
        } else if (this.realBeginDate == null || this.realBeginDate === '') {
            this.editingTask.realBeginDate = null;
        } else if (this.realBeginDate !== this.srcRealBeginDate) {
            this.editingTask.realBeginDate = new Date(new Date(Date.parse(this.realBeginDate)).getTime() + this.localOffset);
        }
        // realEndDate
        if (this.srcRealEndDate == null) {
            if (this.realEndDate !== null && this.realEndDate !== '') {
                this.editingTask.realEndDate = new Date(new Date(Date.parse(this.realEndDate)).getTime() + this.localOffset);
            }
        } else if (this.realEndDate == null || this.realEndDate === '') {
            this.editingTask.realEndDate = null;
        } else if (this.realEndDate !== this.srcRealEndDate) {
            this.editingTask.realEndDate = new Date(new Date(Date.parse(this.realEndDate)).getTime() + this.localOffset);
        }

        this.taskService.update(this.editingTask)
            .then(() => this.router.navigate(['/task/1'])
            );
    }
}
