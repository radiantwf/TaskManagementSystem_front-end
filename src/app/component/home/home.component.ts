import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from './../../service/user.service';
import { AppGlobal } from '../../shared/app-global';
import { User } from '../../model/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  active_create_element = false;
  active_browse_element = true;
  user: User = null;
  constructor(
    private router: Router,
    private userService: UserService,
    private location: Location) {
    if (AppGlobal.getInstance().currentUser == null) {
      this.userService.signin('', '')
        .subscribe(user => {
          if (user != null) {
            AppGlobal.getInstance().currentUser = user;
            this.user = user;
          } else {
            this.router.navigate(['/signout']);
          }
        });
    } else {
      this.user = AppGlobal.getInstance().currentUser;
    }
  }

  ngOnInit() {
  }
}
