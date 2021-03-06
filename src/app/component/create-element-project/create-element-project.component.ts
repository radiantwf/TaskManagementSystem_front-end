import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Project } from './../../model/project';
import { Product } from './../../model/product';
import { Employee } from './../../model/employee';
import { ProjectService } from './../../service/project.service';
import { ProductService } from './../../service/product.service';
import { EmployeeService } from './../../service/employee.service';
import { UserService } from './../../service/user.service';
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
  products: Array<Product>;
  productManagerId: string;
  projectManagerId: string;
  sellerId: string;
  developmentManagerId: string;
  requiringAcceptanceDate: string;
  planningReleaseDate: string;
  localOffset: number = new Date().getTimezoneOffset() * 60000;

  constructor(
    private router: Router,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService,
    private employeeService: EmployeeService,
    private productService: ProductService) { }

  ngOnInit() {
    this.employeeService.getEmployee().then(e => { this.employees = e; this.ProcessEmployees(); });
    this.productService.getAllProducts().then(p => this.products = p);
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
        if (value.empId === this.userService.currentUser.empId) {
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
    if (this.requiringAcceptanceDate != null && this.requiringAcceptanceDate !== undefined && this.requiringAcceptanceDate !== '') {
      this.newProject.requiringAcceptanceDate = new Date(new Date(Date.parse(this.requiringAcceptanceDate)).getTime() + this.localOffset);
    }
    if (this.planningReleaseDate != null && this.planningReleaseDate !== undefined && this.planningReleaseDate !== '') {
      this.newProject.planningReleaseDate = new Date(new Date(Date.parse(this.planningReleaseDate)).getTime() + this.localOffset);
    }
    this.projectService.create(this.newProject).then(() => this.router.navigate(['/project']));
  }
}
