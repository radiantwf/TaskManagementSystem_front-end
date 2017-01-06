import { Component, OnInit, Input } from '@angular/core';
import { Project } from './../../model/project';
import { ProjectService } from './../../service/project.service';
import { UserService } from './../../service/user.service';
import { Router } from '@angular/router';
import { AppGlobal } from '../../shared/app-global';
import { MdDialogRef, MdDialog } from '@angular/material';
import { DialogPlanTaskComponent } from './../dialog-plan-task/dialog-plan-task.component';

@Component({
  selector: 'app-element-project-detail',
  templateUrl: './element-project-detail.component.html',
  styleUrls: ['./../element-project-header/element-project-header.component.css', './element-project-detail.component.css']
})
export class ElementProjectDetailComponent implements OnInit {
  @Input() projectId: string;
  projectRecord: Project = new Project('', '');

  isSeller: boolean = false;
  isOC: boolean = false;
  isProjectAdmin: boolean = false;
  isProjectManager: boolean = false;
  isAdmin: boolean = false;


  accessAlert: boolean = false;
  refuseAlert: boolean = false;

  constructor(private projectService: ProjectService, private userService: UserService, public dialog: MdDialog, private router: Router) { }

  ngOnInit() {
    let user = this.userService.currentUser;

    this.isAdmin = user.permissions.findIndex(value => (value === 1)) >= 0;
    this.isOC = user.permissions.findIndex(value => (value === 99)) >= 0;
    this.isSeller = user.permissions.findIndex(value => (value === 98)) >= 0;
    this.isProjectAdmin = user.permissions.findIndex(value => (value === 11 || value === 21)) >= 0;
    this.isProjectManager = user.permissions.findIndex(value => (value === 19 || value === 29)) >= 0;
    this.projectService.getProject(this.projectId)
      .then(project => this.projectRecord = project);
  }
}
