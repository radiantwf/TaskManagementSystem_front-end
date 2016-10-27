import { Component, OnInit } from '@angular/core';
import { Task } from './../../model/task';

@Component({
  selector: 'element-record',
  templateUrl: './element-record.component.html',
  styleUrls: ['./element-record.component.css'],
  inputs: ['taskRecord']
})
export class ElementRecordComponent implements OnInit {
  private detailFlag = false;
  taskRecord: Task;

  constructor() { }

  ngOnInit() {
  }
  switchDetail() {
    this.detailFlag = !this.detailFlag;
  }
}
