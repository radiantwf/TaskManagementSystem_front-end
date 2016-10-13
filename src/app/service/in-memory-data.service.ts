import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Task } from '../model/task';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    var tasks: Task[] = [
      new Task('T201606120001', '任务管理系统开发'),
      new Task('T201606120002', '任务管理系统开发2'),
      new Task('T201606120003', '任务管理系统开发3'),
      new Task('T201606120004', '任务管理系统开发4'),
      new Task('T201606120005', '任务管理系统开发5'),
      new Task('T201606120006', '任务管理系统开发6'),
      new Task('T201606120007', '任务管理系统开发7'),
      new Task('T201606120008', '任务管理系统开发8'),
      new Task('T201606120009', '任务管理系统开发9'),
      new Task('T201606120010', '任务管理系统开发10')
    ];

    tasks[0].resume = '公安信息化产品中心任务管理系统开发';

    tasks[0].description = '公安信息化产品中心任务管理系统开发，公安信息化产品中心任务管理系统开发，公安信息化产品中心任务管理系统开发。';
    tasks[0].customerContact = '客户1 电话：13810138000';
    tasks[0].creator = '谭继峰';
    tasks[0].createdTime = new Date(2006, 4, 6, 12, 24, 12);
    tasks[0].primarySeller = '销售1';
    tasks[0].primaryOC = '陈天博';
    tasks[0].primaryExecutor = '王峰';
    tasks[0].otherExecutors = ['王峰1', '王峰2'];
    tasks[0].requiringBeginDate = new Date(2006, 4, 6, 12, 24, 12);
    tasks[0].requiringEndDate = new Date(2006, 4, 6, 12, 24, 12);
    tasks[0].planningBeginDate = new Date(2006, 4, 6, 12, 24, 12);
    tasks[0].planningEndDate = new Date(2006, 4, 6, 12, 24, 12);
    tasks[0].realBeginDate = new Date(2006, 4, 6, 12, 24, 12);
    tasks[0].realEndDate = new Date(2006, 4, 6, 12, 24, 12);
    tasks[0].status = '完成';
    tasks[0].relevantProduct = null;
    tasks[0].relevantProject = null;
    tasks[0].comments = null;
    return { tasks };
  }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/