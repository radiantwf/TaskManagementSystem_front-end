import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'element-record-detail',
  templateUrl: './element-record-detail.component.html',
  styleUrls: ['./element-record-detail.component.css',
  './../element-record/element-record.component.css'],
  inputs: ['taskRecord']
})
export class ElementRecordDetailComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
