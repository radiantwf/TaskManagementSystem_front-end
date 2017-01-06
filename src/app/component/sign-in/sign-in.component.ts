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
  authorize = new Authorize();
  wrong_password = false;

  constructor(private router: Router, private userService: UserService) {
  }

  ngOnInit() {
    this.isSignIn = true;
    let savedToken = this.userService.getLocalToken();
    if (savedToken != null && savedToken !== '') {
      this.userService.signin(this.authorize.name, this.authorize.pwd)
        .subscribe(user => {
          if (user != null) {
            this.userService.clearToken();
            this.userService.currentUser = user;
            this.userService.setLocalToken(user.token);
            this.router.navigate(['/task']);
          } else {
            this.userService.clearToken();
            this.isSignIn = false;
          }
        });
    } else {
      this.userService.clearToken();
      this.isSignIn = false;
    }
  }
  onInput() {
    this.wrong_password = false;
  }
  onSubmit() {
    this.userService.clearToken();
    let hash = sha1.hash(this.authorize.pwd);
    this.userService.signin(this.authorize.name, hash)
      .subscribe(user => {
        if (user !== null) {
          this.userService.currentUser = user;
          this.userService.setLocalToken(user.token);
          this.router.navigate(['/task']);
        } else {
          this.userService.clearToken();
          this.wrong_password = true;
        }
      });
  }
}
