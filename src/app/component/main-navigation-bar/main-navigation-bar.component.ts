import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppGlobal } from '../../shared/app-global';
import { User } from '../../model/User';

@Component({
  selector: 'main-navigation-bar',
  templateUrl: './main-navigation-bar.component.html',
  styleUrls: ['./main-navigation-bar.component.css']
})
export class MainNavigationBarComponent implements OnInit {
  createTaskVisibility: boolean;
  createProductVisibility: boolean;
  createProjectVisibility: boolean;

  constructor(private router: Router) {
  }
  ngOnInit() {
    let user = AppGlobal.getInstance().currentUser;
    if (user != null) {
      this.createTaskVisibility = user.permissions.findIndex(value => (value == 1
        || value == 11 || value == 19 || value == 21 || value == 29
        || value == 98 || value == 99)) >= 0;
      this.createProductVisibility = user.permissions.findIndex(value => (value == 1
        || value == 11 || value == 19)) >= 0;
      this.createProjectVisibility = user.permissions.findIndex(value => (value == 1
        || value == 21 || value == 29)) >= 0;
    }
  }
}