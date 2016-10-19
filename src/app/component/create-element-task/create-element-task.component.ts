import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Task } from './../../model/task';
import { TaskService } from './../../service/task.service';

@Component({
  selector: 'create-element-task',
  templateUrl: './create-element-task.component.html',
  styleUrls: ['./../element-record/element-record.component.css', './create-element-task.component.css']
})
export class CreateElementTaskComponent implements OnInit {
  newTask: Task = new Task('','');;
  constructor(
    private router: Router,
    private taskService: TaskService) {
  }
  ngOnInit() {
  }

}
