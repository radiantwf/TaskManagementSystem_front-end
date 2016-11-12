import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Authorize } from '../../model/Authorize';
import { UserService } from './../../service/user.service';
import { AppGlobal } from '../../shared/app-global';
import { sha1 } from '../../shared/sha1';
@Component({
  selector: 'app-root',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  /// <reference path="../../shared/sha1.ts" />
  isSignIn: boolean = true;

  constructor(private router: Router, private userService: UserService) {
  }

  ngOnInit() {
    var token = AppGlobal.getInstance().getLocalToken();
    if (token != null && token != "") {

      this.userService.signin(this.authorize.name, this.authorize.pwd)
        .subscribe(t => { token = t; });
    }
    if (token !== null) {
      AppGlobal.getInstance().setLocalToken(token);
      this.router.navigate(['/task']);
      return;
    }
    AppGlobal.getInstance().clearToken();
    this.isSignIn = false;
  }

  authorize = new Authorize();

  wrong_password = false;
  onInput() {
    this.wrong_password = false;
  }
  onSubmit() {
    var hash = sha1.hash(this.authorize.pwd);
    this.userService.signin(this.authorize.name, hash)
      .subscribe(token => {
        if (token !== null) {
          AppGlobal.getInstance().setLocalToken(token);
          this.router.navigate(['/task']);
          return;
        }
        AppGlobal.getInstance().clearToken();
        this.wrong_password = true;
      });
  }
}
