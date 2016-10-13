import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { Task }        from './../../model/task';
import { TaskService } from './../../service/task.service';

@Component({
  selector: 'element-list',
  templateUrl: './element-list.component.html',
  styleUrls: ['./element-list.component.css']
})

export class ElementListComponent implements OnInit {
  tasks: Task[] = [];

  constructor(
    private router: Router,
    private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.taskService.getTasks()
      .then(tasks => this.tasks = tasks.slice(0, 5));
  }

  gotoDetail(task: Task): void {
    let link = ['/task', task.id];
    this.router.navigate(link);
  }
}
