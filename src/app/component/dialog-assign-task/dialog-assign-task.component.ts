import { Component, OnInit, Optional } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { Employee } from './../../model/employee';
import { EmployeeService } from './../../service/employee.service';
import { AppGlobal } from '../../shared/app-global';

@Component({
  selector: 'app-dialog-assign-task',
  templateUrl: './dialog-assign-task.component.html',
  styleUrls: ['./dialog-assign-task.component.css']
})
export class DialogAssignTaskComponent implements OnInit {
  primaryOCId: string;
  primaryExecutorId: string;
  otherExecutors: string;

  employees: Array<Employee>;
  OC: Array<Employee>;
  taskExecutors: Array<Employee>;
  constructor( @Optional() public dialogRef: MdDialogRef<DialogAssignTaskComponent>, private employeeService: EmployeeService) {
    this.employeeService.getEmployee().then(e => { this.employees = e; this.ProcessEmployees(); });
  }

  ngOnInit() {
  }

  ProcessEmployees() {
    this.OC = new Array<Employee>();
    this.taskExecutors = new Array<Employee>();
    this.employees.forEach(value => {
      if (value.permissions.findIndex(p => (p === 99)) >= 0) {
        this.OC.push(value);
        if (value.empId === AppGlobal.getInstance().currentUser.empId) {
          this.primaryOCId = value.empId;
        }
      }
      if (value.permissions.findIndex(p => (p === 11 || p === 19 || p === 21 || p === 29)) >= 0) {
        this.taskExecutors.push(value);
        if (value.empId === AppGlobal.getInstance().currentUser.empId) {
          this.primaryExecutorId = value.empId;
        }
      }
    });
  }
}
