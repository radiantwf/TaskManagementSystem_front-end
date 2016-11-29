import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Project } from './../../model/project';

@Component({
  selector: 'app-element-project',
  templateUrl: './element-project.component.html',
  styleUrls: ['./element-project.component.css']
})
export class ElementProjectComponent implements OnInit {

  @Input() detailFlag: boolean;
  @Input() project: Project = new Project(null, null);
  @Output() detailClicked = new EventEmitter();

  constructor(private router: Router, private route: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  onDetailClicked(event) {
    this.detailClicked.emit(event);
  }
}
