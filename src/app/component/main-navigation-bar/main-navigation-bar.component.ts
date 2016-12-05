import { Component, OnInit } from '@angular/core';
import { AppGlobal } from '../../shared/app-global';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(private router: Router) {
  }
  ngOnInit() {
    let user = AppGlobal.getInstance().currentUser;
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
  }
}
