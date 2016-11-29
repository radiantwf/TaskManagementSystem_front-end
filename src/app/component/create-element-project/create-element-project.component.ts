import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Project } from './../../model/project';
import { Employee } from './../../model/employee';
import { ProjectService } from './../../service/project.service';
import { EmployeeService } from './../../service/employee.service';
import { AppGlobal } from '../../shared/app-global';
@Component({
  selector: 'app-create-element-project',
  templateUrl: './create-element-project.component.html',
  styleUrls: ['./create-element-project.component.css']
})
export class CreateElementProjectComponent implements OnInit {
  newProject: Project = new Project('', '');
  employees: Array<Employee>;
  productManagers: Array<Employee>;
  projectManagers: Array<Employee>;
  sellers: Array<Employee>;
  developmentManagers: Array<Employee>;
  productManagerId: string;
  projectManagerId: string;
  sellerId: string;
  developmentManagerId: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService,
    private employeeService: EmployeeService) { }

  ngOnInit() {
    this.employeeService.getEmployee().then(e => { this.employees = e; this.ProcessEmployees(); });
  }
  ProcessEmployees() {
    this.productManagers = new Array<Employee>();
    this.projectManagers = new Array<Employee>();
    this.developmentManagers = new Array<Employee>();
    this.sellers = new Array<Employee>();
    this.productManagerId = null;
    this.projectManagerId = null;
    this.developmentManagerId = null;
    this.sellerId = null;
    this.employees.forEach(value => {
      if (value.permissions.findIndex(p => (p === 11 || p === 19)) >= 0) {
        this.productManagers.push(value);
      }
      if (value.permissions.findIndex(p => (p === 21 || p === 29)) >= 0) {
        this.projectManagers.push(value);
        if (value.empId === AppGlobal.getInstance().currentUser.empId) {
          this.projectManagerId = value.empId;
        }
      }
      if (value.permissions.findIndex(p => (p === 38 || p === 39)) >= 0) {
        this.developmentManagers.push(value);
      }
      if (value.permissions.findIndex(p => (p === 98)) >= 0) {
        this.sellers.push(value);
      }
    });
  }
  addProject() {
    this.newProject.productManagerId = this.productManagerId;
    this.newProject.primarySellerId = this.sellerId;
    this.newProject.productManagerId = this.productManagerId;
    this.newProject.developmentManagerId = this.developmentManagerId;
    this.projectService.create(this.newProject).then(() => this.router.navigate(['/project']));
  }
}
