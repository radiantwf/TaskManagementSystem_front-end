import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from './../../service/user.service';
import { AppGlobal } from '../../shared/app-global';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  active_create_element = false;
  active_browse_element = true;

  constructor(
    private router: Router,
    private userService: UserService,
    private location: Location) {
    if (AppGlobal.getInstance().currentUser == null) {
      this.userService.signin('', '')
        .subscribe(user => {
          if (user != null) {
            AppGlobal.getInstance().currentUser = user;
          } else {
            this.router.navigate(['/signout']);
          }
        });
    }
  }

  ngOnInit() {
  }
}
