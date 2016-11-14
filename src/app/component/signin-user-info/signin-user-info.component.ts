import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { User } from '../../model/User';
import { AppGlobal } from '../../shared/app-global';

@Component({
  selector: 'signin-user-info',
  templateUrl: './signin-user-info.component.html',
  styleUrls: ['./signin-user-info.component.css']
})
export class SigninUserInfoComponent implements OnInit {
  myInfo: User = null;
  constructor() { }

  ngOnInit() {
    this.myInfo = AppGlobal.getInstance().currentUser;
  }
}
