import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { AppGlobal } from '../shared/app-global';

import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { Observable } from 'rxjs/Observable';

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
