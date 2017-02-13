import { Component, OnInit, Renderer, ElementRef, ViewChild } from '@angular/core';
import { AppGlobal } from '../../shared/app-global';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './../../service/user.service';

@Component({
  selector: 'main-navigation-bar',
  templateUrl: './main-navigation-bar.component.html',
  styleUrls: ['./main-navigation-bar.component.css']
})
export class MainNavigationBarComponent implements OnInit {
  createTaskVisibility: boolean;
  createProductVisibility: boolean;
  createProjectVisibility: boolean;
  elementType: string = '';
  current: string = 'task';
  @ViewChild('taskcharging') taskcharging: ElementRef;
  @ViewChild('taskprocessing') taskprocessing: ElementRef;
  @ViewChild('task') task: ElementRef;
  @ViewChild('project') project: ElementRef;
  @ViewChild('product') product: ElementRef;
  @ViewChild('changepassword') changepassword: ElementRef;

  constructor(private router: Router, private userService: UserService,
    private renderer: Renderer, private activatedRoute: ActivatedRoute) {
  }
  ngOnInit() {
    let user = this.userService.currentUser;
    if (user != null) {
      this.createTaskVisibility = user.permissions.findIndex(value => (value === 1
        || value === 11 || value === 17 || value === 18 || value === 19
        || value === 21 || value === 29 || value === 98 || value === 99)) >= 0;
      this.createProductVisibility = user.permissions.findIndex(value => (value === 1
        || value === 11 || value === 19)) >= 0;
      this.createProjectVisibility = user.permissions.findIndex(value => (value === 1
        || value === 21 || value === 29)) >= 0;
    }
    let reg = new RegExp('/[a-zA-Z0-9]+');
    let r = reg.exec(this.router.url);
    if (r != null) {
      this.elementType = r[0].toString().substring(1).toLowerCase();
    } else {
      this.elementType = null;
    }
    this.activatedRoute.params.subscribe(params => {
      let reg = new RegExp('/[a-zA-Z0-9]+');
      let r = reg.exec(this.router.url);
      if (r != null) {
        this.elementType = r[0].toString().substring(1).toLowerCase();
      } else {
        this.elementType = null;
      }

      if (typeof (params['searchCriteria2']) !== undefined) {
        if (params['searchCriteria2'] === 'processing') {
          this.current = 'taskprocessing';
        } else if (params['searchCriteria2'] === 'charging') {
          this.current = 'taskcharging';
        } else {
          switch (this.elementType) {
            case 'project':
              this.current = 'project';
              break;
            case 'product':
              this.current = 'product';
              break;
            default:
              this.current = 'task';
              break;
          }
        }
      }
    });
    this.onItemClick(null);
  }
  onItemClick(item: string) {
    if (item != null) {
      this.current = item;
    }
    if (this.taskprocessing !== undefined) {
      this.renderer.setElementClass(this.taskprocessing.nativeElement
        , 'current', this.current === 'taskprocessing');
    }
    if (this.taskcharging !== undefined) {
      this.renderer.setElementClass(this.taskcharging.nativeElement
        , 'current', this.current === 'taskcharging');
    }
    if (this.task !== undefined) {
      this.renderer.setElementClass(this.task.nativeElement
        , 'current', this.current === 'task');
    }
    if (this.project !== undefined) {
      this.renderer.setElementClass(this.project.nativeElement
        , 'current', this.current === 'project');
    }
    if (this.product !== undefined) {
      this.renderer.setElementClass(this.product.nativeElement
        , 'current', this.current === 'product');
    }
  }
}
