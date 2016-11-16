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
  isSignIn: boolean = true;

  constructor(private router: Router, private userService: UserService) {
  }

  ngOnInit() {
    this.isSignIn = true;
    var savedToken = AppGlobal.getInstance().getLocalToken();
    if (savedToken != null && savedToken != "") {
      this.userService.signin(this.authorize.name, this.authorize.pwd)
        .subscribe(user => {
          if (user != null) {
            AppGlobal.getInstance().clearToken();
            AppGlobal.getInstance().currentUser = user;
            AppGlobal.getInstance().setLocalToken(user.token);
            this.router.navigate(['/task', '1']);
          } else {
            AppGlobal.getInstance().clearToken();
            this.isSignIn = false;
          }
        });
    }
    else {
      AppGlobal.getInstance().clearToken();
      this.isSignIn = false;
    }
  }

  authorize = new Authorize();

  wrong_password = false;
  onInput() {
    this.wrong_password = false;
  }
  onSubmit() {
    AppGlobal.getInstance().clearToken();
    var hash = sha1.hash(this.authorize.pwd);
    this.userService.signin(this.authorize.name, hash)
      .subscribe(user => {
        if (user !== null) {
          AppGlobal.getInstance().currentUser = user;
          AppGlobal.getInstance().setLocalToken(user.token);
          this.router.navigate(['/task','1']);
        }
        else {
          AppGlobal.getInstance().clearToken();
          this.wrong_password = true;
        }
      });
  }
}
