import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-element-product',
  templateUrl: './create-element-product.component.html',
  // styleUrls: ['./create-element-product.component.css']
  styleUrls: ['./../element-task-header/element-task-header.component.css', './../create-element-task/create-element-task.component.css']
})
export class CreateElementProductComponent implements OnInit {

  constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }

}
