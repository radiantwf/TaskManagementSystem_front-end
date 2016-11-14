import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Task } from './../../model/task';
import { TaskService } from './../../service/task.service';
import { AppGlobal } from '../../shared/app-global';

@Component({
  selector: 'create-element-task',
  templateUrl: './create-element-task.component.html',
  styleUrls: ['./../element-record-header/element-record-header.component.css', './create-element-task.component.css']
})
export class CreateElementTaskComponent implements OnInit {
  newTask: Task = new Task('', '');
  sellerAreaVisibility: boolean;
  ocAreaVisibility: boolean;
  taskAreaVisibility: boolean;

  constructor(
    private router: Router, private taskService: TaskService) {
  }

  ngOnInit() {
    var user = AppGlobal.getInstance().currentUser;
    if (user != null) {
      this.sellerAreaVisibility = user.permissions.findIndex(value => (value == 1
        || value == 11 || value == 19 || value == 21 || value == 29
        || value == 98 || value == 99)) >= 0;
      this.ocAreaVisibility = user.permissions.findIndex(value => (value == 1
        || value == 11 || value == 19 || value == 21 || value == 29 || value == 98)) >= 0;
      this.taskAreaVisibility = user.permissions.findIndex(value => (value == 1
        || value == 11 || value == 19 || value == 21 || value == 29)) >= 0;
    }
  }

  addTask() {
    if (!this.newTask.name || !this.newTask.resume) { return; }
    this.newTask.id = 'temp';
    this.taskService.create(this.newTask).then(() => this.router.navigate(['/task'])
    );
  }
}
