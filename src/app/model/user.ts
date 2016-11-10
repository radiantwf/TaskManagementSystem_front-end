export class User {
    public empId: string;
    public dept: string;
    public pre: string;
    public name: string;
    public permissions: number[];

    constructor(
    ) { }
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
