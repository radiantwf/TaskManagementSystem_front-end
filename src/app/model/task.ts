import { Communication } from './communication';

// 任务 类型
export class Task {
    constructor(
        // 任务编号
        public id: string,
        // 任务名称
        public name: string
    ) { }

    // 任务简述
    public resume: string;
    // 任务详细描述
    public description: string;
    // 客户联系方式
    public customerContact: string;
    // 任务创建人
    public creator: string;
    // 任务创建时间
    public createdTime: Date;
    // 销售负责人
    public primarySeller: string;
    // OC负责人
    public primaryOC: string;
    // 执行负责人
    public primaryExecutorObjectId: string;
    public primaryExecutorId: string;
    public primaryExecutor: string;
    // 其他执行人
    public otherExecutors: string[];
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

    // 所属产品
    public parentProductId: string;
    public parentProduct: string;
    // 所属项目
    public parentProjectId: string;
    public parentProject: string;
    
    createTask(
        id: string,
        name: string,
        resume: string,
        description: string,
        customerContact: string,
        creator: string,
        createdTime: Date,
        primarySeller: string,
        primaryOC: string,
        primaryExecutor: string,
        otherExecutors: string[],
        requiringBeginDate: Date,
        requiringEndDate: Date,
        planningBeginDate: Date,
        planningEndDate: Date,
        realBeginDate: Date,
        realEndDate: Date,
        status: string,
        parentProductId: string,
        parentProduct: string,
        parentProjectId: string,
        parentProject: string
    ) {
        this.id = id;
        this.name = name;
        this.resume = resume;
        this.description = description;
        this.customerContact = customerContact;
        this.creator = creator;
        this.createdTime = createdTime;
        this.primarySeller = primarySeller;
        this.primaryOC = primaryOC;
        this.primaryExecutor = primaryExecutor;
        this.otherExecutors = otherExecutors;
        this.requiringBeginDate = requiringBeginDate;
        this.requiringEndDate = requiringEndDate;
        this.planningBeginDate = planningBeginDate;
        this.planningEndDate = planningEndDate;
        this.realBeginDate = realBeginDate;
        this.realEndDate = realEndDate;
        this.status = status;
        this.parentProduct = parentProduct;
        this.parentProject = parentProject
    }
}
