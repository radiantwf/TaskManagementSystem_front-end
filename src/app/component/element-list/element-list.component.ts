import {
  Component, OnInit
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { Task } from './../../model/task';
import { TaskService } from './../../service/task.service';
import { AppGlobal } from '../../shared/app-global';

@Component({
  selector: 'element-list',
  templateUrl: './element-list.component.html',
  styleUrls: ['./element-list.component.css']
})

export class ElementListComponent implements OnInit {
  tasks: Task[] = [];
  id: string = "";
  page: number;
  constructor(
    private taskService: TaskService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (typeof (params['page']) == "undefined") {
        this.page = 1;
      }
      else {
        this.page = parseInt(params['page']);
      }
      this.taskService.getTasks(this.page)
        .then(tasks => this.tasks = tasks);
    });
  }
  onDetailClicked(event) {
    if (this.id == event) {
      this.id = "";
    } else {
      this.id = event;
    }
  }
  prevPage() {
    var prevPage = 0;
    if (this.page <= 1) {
      prevPage = 1;
    } else {
      prevPage = this.page - 1;
    }
    this.router.navigate(['/task', prevPage.toString()]);
  }
  nextPage() {
    var nextPage = 0;
    if (this.page >= AppGlobal.getInstance().lastPage) {
      nextPage = AppGlobal.getInstance().lastPage;
    } else {
      nextPage = this.page + 1;
    }
    this.router.navigate(['/task', nextPage.toString()]);
  }
}
