import { Component, OnInit, Optional } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-dialog-refuse-task',
  templateUrl: './dialog-refuse-task.component.html',
  styleUrls: ['./dialog-refuse-task.component.css']
})
export class DialogRefuseTaskComponent implements OnInit {
  constructor( @Optional() public dialogRef: MdDialogRef<DialogRefuseTaskComponent>) { }

  ngOnInit() {
  }

}
