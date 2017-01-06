import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from './../../model/product';
import { Employee } from './../../model/employee';
import { ProductService } from './../../service/product.service';
import { EmployeeService } from './../../service/employee.service';
import { UserService } from './../../service/user.service';
import { AppGlobal } from '../../shared/app-global';

@Component({
  selector: 'app-create-element-product',
  templateUrl: './create-element-product.component.html',
  // styleUrls: ['./create-element-product.component.css']
  styleUrls: ['./../element-task-header/element-task-header.component.css', './create-element-product.component.css']
})
export class CreateElementProductComponent implements OnInit {
  newProduct: Product = new Product('', '');
  employees: Array<Employee>;
  productManagers: Array<Employee>;
  marketingManagers: Array<Employee>;
  developmentManagers: Array<Employee>;
  productManagerId: string;
  marketingManagerId: string;
  developmentManagerId: string;
  planningReleaseDate: string;
  localOffset: number = new Date().getTimezoneOffset() * 60000;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private productService: ProductService,
    private employeeService: EmployeeService) { }

  ngOnInit() {
    this.employeeService.getEmployee().then(e => { this.employees = e; this.ProcessEmployees(); });
  }
  ProcessEmployees() {
    this.productManagers = new Array<Employee>();
    this.marketingManagers = new Array<Employee>();
    this.developmentManagers = new Array<Employee>();
    this.productManagerId = null;
    this.marketingManagerId = null;
    this.developmentManagerId = null;
    this.employees.forEach(value => {
      if (value.permissions.findIndex(p => (p === 11 || p === 19)) >= 0) {
        this.productManagers.push(value);
        if (value.empId === this.userService.currentUser.empId) {
          this.productManagerId = value.empId;
        }
      }
      if (value.permissions.findIndex(p => (p === 17)) >= 0) {
        this.marketingManagers.push(value);
      }
      if (value.permissions.findIndex(p => (p === 38 || p === 39)) >= 0) {
        this.developmentManagers.push(value);
      }
    });
  }
  addProduct() {
    this.newProduct.productManagerId = this.productManagerId;
    this.newProduct.marketingManagerId = this.marketingManagerId;
    this.newProduct.developmentManagerId = this.developmentManagerId;
    if (this.planningReleaseDate != null && this.planningReleaseDate !== undefined && this.planningReleaseDate !== '') {
      this.newProduct.planningReleaseDate = new Date(new Date(Date.parse(this.planningReleaseDate)).getTime() + this.localOffset);
    }
    this.productService.create(this.newProduct).then(() => this.router.navigate(['/product']));
  }
}
