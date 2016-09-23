import { Injectable } from '@angular/core';
import { Task } from '../model/task';
import { TASKS } from '../model/mock/mock-task';

@Injectable()
export class TaskService {

  constructor() { }

  getTasks(): Promise<Task[]> {
    return Promise.resolve(TASKS);
  }
}
