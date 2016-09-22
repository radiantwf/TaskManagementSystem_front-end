// 任务 类型
export class Task {
    // 任务编号
    public num: string;
    // 任务名称
    public name: string;
    // 任务简述
    public resume: string;
    // 任务详细描述
    public description: string;
    // 客户联系方式
    // 任务创建人
    public creator: string;
    // 商务负责人
    public primarySeller: string;
    // OC负责人
    public primaryOC: string;
    // 执行负责人
    public primaryExecutor: string;
    // 其他执行人
    public otherExecutors: string;
    // 任务要求执行周期
    public requiringBeginDate: Date;
    public requiringEndDate: Date;
    // 任务计划执行周期
    public planningBeginDate: Date;
    public planningEndDate: Date;
    // 任务实际执行周期
    public realBeginDate: Date;
    public realEndDate: Date;
    // 任务状态
    public status: string;
    // 关联产品
    public relevantProduct: any;
    // 关联项目
    public relevantProject: any;
    // 评论
    public comments: any;
}
