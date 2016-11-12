import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppGlobal } from '../../shared/app-global';

@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.css']
})
export class SignOutComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    AppGlobal.getInstance().clearToken();
    setTimeout(function (router) {
      router.navigate(['/']);
    }, 100, this.router);
  }
}
