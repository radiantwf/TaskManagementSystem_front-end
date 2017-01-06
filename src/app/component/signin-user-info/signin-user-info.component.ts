import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { User } from '../../model/User';
import { UserService } from './../../service/user.service';
import { AppGlobal } from '../../shared/app-global';

@Component({
  selector: 'signin-user-info',
  templateUrl: './signin-user-info.component.html',
  styleUrls: ['./signin-user-info.component.css']
})
export class SigninUserInfoComponent implements OnInit {
  myInfo: User = null;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.myInfo = this.userService.currentUser;
  }
}
