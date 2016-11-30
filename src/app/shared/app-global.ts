import { User } from '../model/User';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';

/**
 * AppGlobal 全局定义 单例模式
 */
export class AppGlobal {
    private static instance: AppGlobal = new AppGlobal();
    private _currentUser: User = null;
    private _currentUserObservable = Observable.create(this._currentUser);
    private token: string = null;
    public appURL: string = '';
    public authorization_code: string = null;
    public pageSize: number = 10;
    public lastPage: number = 0;

    /**
     * 获取当前实例
     * 
     * @static
     * @returns {AppGlobal}
     */
    public static getInstance(): AppGlobal {
        return AppGlobal.instance;
    }

    constructor() {
        if (AppGlobal.instance) {
            throw new Error('错误: 请使用AppGlobal.getInstance() 代替使用new.');
        }
        AppGlobal.instance = this;

        if (environment.production) {
            this.appURL = 'http://task.hisign.top:6001/v1';
        } else {
            this.appURL = 'http://127.0.0.1:8888/v1';
        }
        // this.appURL = 'app';
    }

    set currentUser(user: User) {
        this._currentUser = user;
    }
    get currentUser(): User {
        return this._currentUser;
    }

    get currentUserObservable(): Observable<User> {
        return this._currentUserObservable;
    }
    // CurrentUser(http: Http): User {
    //     if (this._currentUser == null) {
    //         let userService = new UserService(http);
    //         let sub = userService.signin('', '')
    //             .subscribe(user => {
    //                 if (user != null) {
    //                     this._currentUser = user;
    //                     return this._currentUser;
    //                 }
    //             });
    //     }
    //     return this._currentUser;
    // }

    public getLocalToken(): string {
        if (this.token != null) {
            return this.token;
        }
        return this.getCookie('token');
    }

    public setLocalToken(token: string) {
        this.token = token;
        if (this.token != null) {
            this.setCookie('token', this.token, 1);
        } else {
            this.clearCookie('token');
        }
    }
    public clearToken() {
        this.token = null;
        this.clearCookie('token');
    }
    // 设置cookie
    private setCookie(cname, cvalue, exdays) {
        let d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = 'expires=' + d.toUTCString();
        document.cookie = cname + '=' + cvalue + '; ' + expires + ';path=/';
    }
    // 获取cookie
    private getCookie(cname) {
        let name = cname + '=';
        let ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) !== -1) {
                return c.substring(name.length, c.length);
            }
        }
        return '';
    }
    // 清除cookie 
    private clearCookie(name) {
        this.setCookie(name, '', -1);
    }
}
