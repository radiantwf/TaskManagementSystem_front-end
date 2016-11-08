import { User } from '../model/User';
import { environment } from '../../environments/environment';

/**
 * AppGlobal 全局定义 单例模式
 */
export class AppGlobal {
    private static instance: AppGlobal = new AppGlobal();
    appURL: string
    authorization_code: string = null;
    private token: string = null;

    /**当前用户信息 */
    currentUser: User = new User();
    /**分页页数 */
    pageSize: number = 10;

    constructor() {
        if (AppGlobal.instance) {
            throw new Error("错误: 请使用AppGlobal.getInstance() 代替使用new.");
        }
        AppGlobal.instance = this;
        this.currentUser.empId = '000169'

        if (environment.production) {
            this.appURL = 'http://task.hisign.top:6001/v1';
        } else {
            this.appURL = 'http://127.0.0.1:8888/v1';
        }
        // this.appURL = 'app';
    }

    public getLocalToken(): string {
        if (this.token != null) {
            return this.token
        }
        return this.getCookie("token");
    }

    public setLocalToken(token: string) {
        this.token = token;
        if (this.token != null) {
            this.setCookie("token", this.token)
        } else {
            this.delCookie("token")
        }
    }
    public clearToken() {
        this.token = null;
        this.delCookie("token");
    }

    private getCookie(name: string) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
            return arr[2];
        else
            return null;
    }
    private setCookie(name: string, value: string) {
        var Days = 30;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        document.cookie = name + "=" + value + ";expires=" + exp.toUTCString();
    }
    private delCookie(name: string) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = this.getCookie(name);
        if (cval != null)
            document.cookie = name + "=" + cval + ";expires=" + exp.toUTCString();
    }

    /**
     * 获取当前实例
     * 
     * @static
     * @returns {AppGlobal}
     */
    public static getInstance(): AppGlobal {
        return AppGlobal.instance;
    }


}