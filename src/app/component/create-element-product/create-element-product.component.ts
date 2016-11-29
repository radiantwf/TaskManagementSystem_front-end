import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from './../../model/product';
import { Employee } from './../../model/employee';
import { ProductService } from './../../service/product.service';
import { EmployeeService } from './../../service/employee.service';
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
  devlopmentManagers: Array<Employee>;
  productManagerId: string;
  marketingManagerId: string;
  devlopmentManagerId: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private employeeService: EmployeeService) { }

  ngOnInit() {
    this.employeeService.getEmployee().then(e => { this.employees = e; this.ProcessEmployees(); });
  }
  ProcessEmployees() {
    this.productManagers = new Array<Employee>();
    this.marketingManagers = new Array<Employee>();
    this.devlopmentManagers = new Array<Employee>();
    this.productManagerId = null;
    this.marketingManagerId = null;
    this.devlopmentManagerId = null;
    this.employees.forEach(value => {
      if (value.permissions.findIndex(p => (p === 11 || p === 19)) >= 0) {
        this.productManagers.push(value);
        if (value.empId === AppGlobal.getInstance().currentUser.empId) {
          this.productManagerId = value.empId;
        }
      }
      if (value.permissions.findIndex(p => (p === 97)) >= 0) {
        this.marketingManagers.push(value);
      }
      if (value.permissions.findIndex(p => (p === 38 || p === 39)) >= 0) {
        this.devlopmentManagers.push(value);
      }
    });
  }
  addProduct() { }
}
