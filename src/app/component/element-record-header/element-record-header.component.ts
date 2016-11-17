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
  detailFlag = false;
  taskRecord: Task;
  detailClicked = new EventEmitter();
  processFlag: boolean = false;
  deleteAble: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
    var user = AppGlobal.getInstance().currentUser;

    if (this.taskRecord.status == '新建' && user.permissions.findIndex(value => (value == 1
      || value == 11 || value == 21 || value == 99)) >= 0) {
      this.processFlag = true;
      console.log(this.taskRecord.creatorId);
    } else {
      this.processFlag = false;
    }
    if (this.taskRecord.status == '新建' && user.empId == this.taskRecord.creatorId) {
      this.deleteAble = true;
    } else {
      this.deleteAble = false;
    }
  }

  onDetailClicked(event) {
    this.detailClicked.emit(event);
  }
}
