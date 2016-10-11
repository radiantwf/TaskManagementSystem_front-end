import { Task } from '../task';

export var TASKS: Task[] = [
    new Task('T201606120001','任务管理系统开发'),
    new Task('T201606120002','任务管理系统开发2'),
    new Task('T201606120003','任务管理系统开发3'),
    new Task('T201606120004','任务管理系统开发4'),
    new Task('T201606120005','任务管理系统开发5'),
    new Task('T201606120006','任务管理系统开发6'),
    new Task('T201606120007','任务管理系统开发7'),
    new Task('T201606120008','任务管理系统开发8'),
    new Task('T201606120009','任务管理系统开发9'),
    new Task('T201606120010','任务管理系统开发10')
];

TASKS[0].resume = '公安信息化产品中心任务管理系统开发';

TASKS[0].description = '公安信息化产品中心任务管理系统开发，公安信息化产品中心任务管理系统开发，公安信息化产品中心任务管理系统开发。';
TASKS[0].customerContact = '客户1 电话：13810138000';
TASKS[0].creator = '谭继峰';
//TASKS[0].createdTime = '2016-04-06 12:24:12';
TASKS[0].primarySeller = '销售1';
TASKS[0].primaryOC = '陈天博';
TASKS[0].primaryExecutor = '王峰';
TASKS[0].otherExecutors = ['王峰1', '王峰2'];
// TASKS[0].requiringBeginDate = '2016-04-06 12:24:12';
// TASKS[0].requiringEndDate = '2016-04-06 12:24:12';
// TASKS[0].planningBeginDate = '2016-04-06 12:24:12';
// TASKS[0].planningEndDate = '2016-04-06 12:24:12';
// TASKS[0].realBeginDate = '2016-04-06 12:24:12';
// TASKS[0].realEndDate = '2016-04-06 12:24:12';
TASKS[0].status = '完成';
TASKS[0].relevantProduct = null;
TASKS[0].relevantProject = null;
TASKS[0].comments = null;