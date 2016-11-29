import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from './../../model/product';

@Component({
  selector: 'app-element-product',
  templateUrl: './element-product.component.html',
  styleUrls: ['./element-product.component.css']
})
export class ElementProductComponent implements OnInit {

  @Input() detailFlag: boolean;
  @Input() product: Product = new Product(null, null);
  @Output() detailClicked = new EventEmitter();

  constructor(private router: Router, private route: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  onDetailClicked(event) {
    this.detailClicked.emit(event);
  }
}
