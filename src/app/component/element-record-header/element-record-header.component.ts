import { Component, OnInit, EventEmitter } from '@angular/core';
import { Task } from './../../model/task';
import { Router } from '@angular/router';

@Component({
  selector: 'element-record-header',
  templateUrl: './element-record-header.component.html',
  styleUrls: ['./element-record-header.component.css'],
  inputs: ['taskRecord', 'detailFlag'],
  outputs: ['detailClicked']
})
export class ElementRecordHeaderComponent implements OnInit {
  private detailFlag = false;
  taskRecord: Task;
  detailClicked = new EventEmitter();
  constructor(private router: Router) { }

  ngOnInit() {
  }
  onDetailClicked(event) {
    this.detailClicked.emit(event);
  }
}
