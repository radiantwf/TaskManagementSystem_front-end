import { User } from '../model/User';

/**
 * AppGlobal 全局定义 单例模式
 */
export class AppGlobal {
    private static instance: AppGlobal = new AppGlobal();
    // appURL: string = 'http://127.0.0.1:8888/v1';
    appURL: string = 'app';
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