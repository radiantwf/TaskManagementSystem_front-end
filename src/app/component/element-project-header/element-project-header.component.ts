import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Project } from './../../model/project';
import { Router } from '@angular/router';
import { AppGlobal } from '../../shared/app-global';
import { MdDialogRef, MdDialog } from '@angular/material';
import { DialogDelElementComponent } from './../dialog-del-element/dialog-del-element.component';
import { DialogStartElementComponent } from './../dialog-start-element/dialog-start-element.component';
import { DialogFinishElementComponent } from './../dialog-finish-element/dialog-finish-element.component';
import { DialogProgressPercentageComponent } from './../dialog-progress-percentage/dialog-progress-percentage.component';
import { DialogCloseElementComponent } from './../dialog-close-element/dialog-close-element.component';

import { ProjectService } from './../../service/project.service';
import { UserService } from './../../service/user.service';

@Component({
  selector: 'app-element-project-header',
  templateUrl: './element-project-header.component.html',
  styleUrls: ['./element-project-header.component.css']
})
export class ElementProjectHeaderComponent implements OnInit {

  @Input() detailFlag = false;
  @Input() projectRecord: Project;
  @Output() detailClicked = new EventEmitter();

  isSeller: boolean = false;
  isOC: boolean = false;
  isProjectAdmin: boolean = false;
  isProjectManager: boolean = false;
  isAdmin: boolean = false;
  accessAlert: boolean = false;
  refuseAlert: boolean = false;
  startAlert: boolean = false;
  menuAlert: boolean = false;

  startAble: boolean = false;
  progessAble: boolean = false;
  finishAble: boolean = false;
  closeAble: boolean = false;
  editAble: boolean = false;
  deleteAble: boolean = false;


  constructor(private router: Router, private userService: UserService, public dialog: MdDialog, private projectService: ProjectService) { }

  ngOnInit() {
    let user = this.userService.currentUser;

    this.isAdmin = user.permissions.findIndex(value => (value === 1)) >= 0;
    this.isOC = user.permissions.findIndex(value => (value === 99)) >= 0;
    this.isSeller = user.permissions.findIndex(value => (value === 98)) >= 0;
    this.isProjectAdmin = user.permissions.findIndex(value => (value === 11 || value === 21)) >= 0;
    this.isProjectManager = user.permissions.findIndex(value => (value === 19 || value === 29)) >= 0;

  }

  onDetailClicked(event) {
    this.detailClicked.emit(event);
  }
}
