import { User } from '../model/User';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';

/**
 * AppGlobal 全局定义 单例模式
 */
export class AppGlobal {
    private static instance: AppGlobal = new AppGlobal();

    public appURL: string = '';
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
}
