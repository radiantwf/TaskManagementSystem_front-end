import { Component, OnInit, Input } from '@angular/core';
import { Product } from './../../model/product';
import { ProductService } from './../../service/product.service';
import { Router } from '@angular/router';
import { AppGlobal } from '../../shared/app-global';
import { MdDialogRef, MdDialog } from '@angular/material';
import { DialogPlanTaskComponent } from './../dialog-plan-task/dialog-plan-task.component';

@Component({
  selector: 'app-element-product-detail',
  templateUrl: './element-product-detail.component.html',
  styleUrls: ['./../element-product-header/element-product-header.component.css', './element-product-detail.component.css']
})
export class ElementProductDetailComponent implements OnInit {
  @Input() productId: string;
  productRecord: Product = new Product('', '');

  isSeller: boolean = false;
  isOC: boolean = false;
  isProductAdmin: boolean = false;
  isProductManager: boolean = false;
  isAdmin: boolean = false;


  accessAlert: boolean = false;
  refuseAlert: boolean = false;

  constructor(private productService: ProductService, public dialog: MdDialog, private router: Router) { }

  ngOnInit() {
    let user = AppGlobal.getInstance().currentUser;

    this.isAdmin = user.permissions.findIndex(value => (value === 1)) >= 0;
    this.isOC = user.permissions.findIndex(value => (value === 99)) >= 0;
    this.isSeller = user.permissions.findIndex(value => (value === 98)) >= 0;
    this.isProductAdmin = user.permissions.findIndex(value => (value === 11 || value === 21)) >= 0;
    this.isProductManager = user.permissions.findIndex(value => (value === 19 || value === 29)) >= 0;
    this.productService.getProduct(this.productId)
      .then(product => this.productRecord = product);
  }
}
