import { Component, OnInit } from '@angular/core';
import { Task } from './../../model/task';
import { TaskService } from './../../service/task.service';

@Component({
  selector: 'element-record-detail',
  templateUrl: './element-record-detail.component.html',
  styleUrls: ['./../element-record-header/element-record-header.component.css', './element-record-detail.component.css'],
  inputs: ['taskId']
})
export class ElementRecordDetailComponent implements OnInit {
  taskId: string;
  taskRecord: Task = new Task('', '');

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.taskService.getTask(this.taskId)
      .then(task => this.taskRecord = task);
  }

}
