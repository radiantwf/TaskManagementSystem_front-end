export class User {
    public token: string;
    public empId: string;
    public dept: string;
    public pre: string;
    public name: string;
    public permissions: Array<number>;

    constructor(
    ) { }

    get  isAdmin(): boolean {
        var ret = (this.permissions.findIndex(value => (value == 1)) >= 0);
        return ret;
    }
    get  isProductAdmin(): boolean {
        var ret = (this.permissions.findIndex(value => (value == 11)) >= 0);
        return ret;
    }
    get  isProductManager(): boolean {
        var ret = (this.permissions.findIndex(value => (value == 19))) >= 0;
        return ret;
    }
    get  isProjectManager(): boolean {
        var ret = (this.permissions.findIndex(value => (value == 21)) >= 0);
        return ret;
    }
    get  isProjectAdmin(): boolean {
        var ret = (this.permissions.findIndex(value => (value == 29))) >= 0;
        return ret;
    }
    get  isTaskManager(): boolean {
        var ret = (this.permissions.findIndex(value => (value == 19 || value == 29))) >= 0;
        return ret;
    }
    get  isTaskAdmin(): boolean {
        var ret = (this.permissions.findIndex(value => (value == 11 || value == 21))) >= 0;
        return ret;
    }
    get  isSeller(): boolean {
        var ret = (this.permissions.findIndex(value => (value == 98)) >= 0);
        return ret;
    }
    get  isOC(): boolean {
        var ret = (this.permissions.findIndex(value => (value == 99)) >= 0);
        return ret;
    }
    get  isDeveloper(): boolean {
        var ret = (this.permissions.findIndex(value => (value == 39)) >= 0);
        return ret;
    }
    get  isTester(): boolean {
        var ret = (this.permissions.findIndex(value => (value == 100)) >= 0);
        return ret;
    }
}


// 权限设定
// 1        系统管理员
// 11       产品经理管理员
// 19       产品经理
// 21       项目经理管理员
// 29       项目经理
// 39       研发
// 98       销售
// 99       OC
// 100      测试用户
