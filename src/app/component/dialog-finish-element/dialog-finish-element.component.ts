import { Component, OnInit, Optional } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { Task } from './../../model/task';

@Component({
  selector: 'app-dialog-finish-element',
  templateUrl: './dialog-finish-element.component.html',
  styleUrls: ['./dialog-finish-element.component.css']
})
export class DialogFinishElementComponent implements OnInit {
  task: Task = new Task(null, null);

  constructor( @Optional() public dialogRef: MdDialogRef<DialogFinishElementComponent>) { }

  ngOnInit() {
  }

}
