import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'element-detail-header',
  templateUrl: './element-detail-header.component.html',
  styleUrls: ['./element-detail-header.component.css',
  './../element-detail/element-detail.component.css'],
  inputs: ['childProperty']
})
export class ElementDetailHeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
