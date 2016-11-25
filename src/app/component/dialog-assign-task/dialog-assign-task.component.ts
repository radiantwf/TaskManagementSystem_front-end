import { Component, OnInit, Optional } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-dialog-assign-task',
  templateUrl: './dialog-assign-task.component.html',
  styleUrls: ['./dialog-assign-task.component.css']
})
export class DialogAssignTaskComponent implements OnInit {

  constructor( @Optional() public dialogRef: MdDialogRef<DialogAssignTaskComponent>) { }

  ngOnInit() {
  }

}
