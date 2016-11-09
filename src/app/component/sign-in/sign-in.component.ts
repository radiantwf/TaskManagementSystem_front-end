import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Authorize } from '../../model/Authorize';
import { UserService } from './../../service/user.service';
import { AppGlobal } from '../../shared/app-global';

@Component({
  selector: 'app-root',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) {
    var token = AppGlobal.getInstance().getLocalToken();
    if (token != null && token != "") {

      this.userService.signin(this.authorize.name, this.authorize.pwd)
        .subscribe(token => {
          if (token !== null) {
            AppGlobal.getInstance().setLocalToken(token);
            this.router.navigate(['/task']);
            return;
          }
          AppGlobal.getInstance().clearToken();
        });
    }
  }

  ngOnInit() {
  }

  authorize = new Authorize();

  wrong_password = false;
  onInput() {
    this.wrong_password = false;
  }
  onSubmit() {
    this.userService.signin(this.authorize.name, this.authorize.pwd)
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
