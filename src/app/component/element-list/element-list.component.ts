import {
  Component, OnInit
} from '@angular/core';

import { Task } from './../../model/task';
import { TaskService } from './../../service/task.service';

@Component({
  selector: 'element-list',
  templateUrl: './element-list.component.html',
  styleUrls: ['./element-list.component.css']
})

export class ElementListComponent implements OnInit {
  tasks: Task[] = [];
  id: string = "";
  constructor(
    private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.taskService.getTasks()
      .then(tasks => this.tasks = tasks);
  }
  onDetailClicked(event) {
    if (this.id == event) {
      this.id = "";
    } else {
      this.id = event;
    }
  }
}
