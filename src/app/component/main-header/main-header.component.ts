import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainHeaderService } from './../../service/main-header.service';
import { TaskCounts } from '../../model/counts';

@Component({
  selector: 'main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent implements OnInit {

  counts: TaskCounts = new TaskCounts()

  constructor(private router: Router, private service: MainHeaderService) {
  }

  ngOnInit() {
    this.service.getTaskCounts()
      .subscribe(counts => {
        if (counts !== null) {
          this.counts = counts;
        }
      });
  }

}
