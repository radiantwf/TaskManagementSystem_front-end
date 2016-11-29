import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Product } from './../../model/product';
import { Router } from '@angular/router';
import { AppGlobal } from '../../shared/app-global';
import { MdDialogRef, MdDialog } from '@angular/material';
import { DialogDelElementComponent } from './../dialog-del-element/dialog-del-element.component';
import { DialogStartElementComponent } from './../dialog-start-element/dialog-start-element.component';
import { DialogFinishElementComponent } from './../dialog-finish-element/dialog-finish-element.component';
import { DialogProgressPercentageComponent } from './../dialog-progress-percentage/dialog-progress-percentage.component';
import { DialogCloseElementComponent } from './../dialog-close-element/dialog-close-element.component';

import { ProductService } from './../../service/product.service';

@Component({
  selector: 'app-element-product-header',
  templateUrl: './element-product-header.component.html',
  styleUrls: ['./element-product-header.component.css']
})
export class ElementProductHeaderComponent implements OnInit {

  @Input() detailFlag = false;
  @Input() productRecord: Product;
  @Output() detailClicked = new EventEmitter();

  isSeller: boolean = false;
  isOC: boolean = false;
  isProductAdmin: boolean = false;
  isProductManager: boolean = false;
  isAdmin: boolean = false;
  accessAlert: boolean = false;
  refuseAlert: boolean = false;
  startAlert: boolean = false;
  menuAlert: boolean = false;

  startAble: boolean = false;
  progessAble: boolean = false;
  finishAble: boolean = false;
  closeAble: boolean = false;
  editAble: boolean = false;
  deleteAble: boolean = false;


  constructor(private router: Router, public dialog: MdDialog, private productService: ProductService) { }

  ngOnInit() {
    let user = AppGlobal.getInstance().currentUser;

    this.isAdmin = user.permissions.findIndex(value => (value === 1)) >= 0;
    this.isOC = user.permissions.findIndex(value => (value === 99)) >= 0;
    this.isSeller = user.permissions.findIndex(value => (value === 98)) >= 0;
    this.isProductAdmin = user.permissions.findIndex(value => (value === 11 || value === 21)) >= 0;
    this.isProductManager = user.permissions.findIndex(value => (value === 19 || value === 29)) >= 0;
  }

  onDetailClicked(event) {
    this.detailClicked.emit(event);
  }
}
