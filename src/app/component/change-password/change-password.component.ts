import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Authorize } from '../../model/Authorize';
import { UserService } from './../../service/user.service';
import { AppGlobal } from '../../shared/app-global';
import { sha1 } from '../../shared/sha1';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  authorize = new Authorize();
  repeatpwd: string = '';
  wrong_password = false;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.authorize.pwd = '';
    this.authorize.newpwd = '';
  }

  onNewPasswordInput() {
    this.wrong_password = false;
  }

  onSubmit() {
    this.authorize.name = AppGlobal.getInstance().currentUser.uid;
    let hash = sha1.hash(this.authorize.pwd);
    let hashNewPassword = sha1.hash(this.authorize.newpwd);
    this.userService.changePassword(this.authorize.name, hash, hashNewPassword)
      .subscribe(result => {
        if (result === 'update success!') {
          alert('密码修改成功，请重新登录。');
          this.router.navigate(['/signout']);
        } else {
          this.wrong_password = true;
        }
      });
  }
}
