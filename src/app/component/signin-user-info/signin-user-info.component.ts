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
  myInfo: User = new (User);
  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.userService.getUserInfo()
      .subscribe(userInfo => {
        if (userInfo !== null) {
          this.myInfo = userInfo;
        }
      });
  }

}
