import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './../../service/user.service';
import { AppGlobal } from '../../shared/app-global';

@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.css']
})
export class SignOutComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.userService.clearToken();
    this.userService.currentUser = null;
    setTimeout(function (router) {
      router.navigate(['/']);
    }, 100, this.router);
  }
}
