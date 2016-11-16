import { Component, OnInit, EventEmitter } from '@angular/core';
import { Task } from './../../model/task';
import { Router } from '@angular/router';
import { AppGlobal } from '../../shared/app-global';

@Component({
  selector: 'element-record-header',
  templateUrl: './element-record-header.component.html',
  styleUrls: ['./element-record-header.component.css'],
  inputs: ['taskRecord', 'detailFlag'],
  outputs: ['detailClicked']
})
export class ElementRecordHeaderComponent implements OnInit {
  private detailFlag = false;
  private taskRecord: Task;
  private detailClicked = new EventEmitter();
  private processFlag: boolean = false;
  constructor(private router: Router) { }

  ngOnInit() {
    var permissions = AppGlobal.getInstance().currentUser.permissions;
    if (this.taskRecord.status == "新建" && permissions.findIndex(value => (value == 1
      || value == 11 || value == 21 || value == 98)) >= 0) {
      this.processFlag = true;
    } else {
      this.processFlag = false;
    }
  }

  onDetailClicked(event) {
    this.detailClicked.emit(event);
  }
}
