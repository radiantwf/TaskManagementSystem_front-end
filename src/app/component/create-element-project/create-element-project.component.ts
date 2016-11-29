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
  selllers: Array<Employee>;
  devlopmentManagers: Array<Employee>;
  productManagerId: string;
  projectManagerId: string;
  sellerId: string;
  devlopmentManagerId: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private productService: ProjectService,
    private employeeService: EmployeeService) { }

  ngOnInit() {
    this.employeeService.getEmployee().then(e => { this.employees = e; this.ProcessEmployees(); });
  }
  ProcessEmployees() {
    this.productManagers = new Array<Employee>();
    this.projectManagers = new Array<Employee>();
    this.devlopmentManagers = new Array<Employee>();
    this.selllers = new Array<Employee>();
    this.productManagerId = null;
    this.projectManagerId = null;
    this.devlopmentManagerId = null;
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
        this.devlopmentManagers.push(value);
      }
      if (value.permissions.findIndex(p => (p === 98)) >= 0) {
        this.selllers.push(value);
      }
    });
  }
  addProduct() { }
}
