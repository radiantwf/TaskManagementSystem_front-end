import { Component, OnInit, Optional } from '@angular/core';
import { MdDialogRef, MdDialog } from '@angular/material';
import { Task } from './../../model/task';

@Component({
  selector: 'app-dialog-start-element',
  templateUrl: './dialog-start-element.component.html',
  styleUrls: ['./dialog-start-element.component.css']
})
export class DialogStartElementComponent implements OnInit {
  task: Task = new Task(null, null);

  constructor( @Optional() public dialogRef: MdDialogRef<DialogStartElementComponent>) { }

  ngOnInit() {
  }

}
