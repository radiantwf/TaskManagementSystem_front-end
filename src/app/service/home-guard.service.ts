import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { AppGlobal } from '../shared/app-global';

import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

@Injectable()
export class HomeGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    if (AppGlobal.getInstance().currentUser == null) {
      return this.userService.signin('', '')
        .map(user => {
          if (user != null) {
            AppGlobal.getInstance().currentUser = user;
            return true;
          } else {
            this.router.navigate(['/signout']);
            return false;
          }
        });
    }
    return true;
  }
}
