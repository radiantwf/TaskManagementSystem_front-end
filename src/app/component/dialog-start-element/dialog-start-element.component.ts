import { Component, OnInit, Optional } from '@angular/core';
import { MdDialogRef, MdDialog } from '@angular/material';

@Component({
  selector: 'app-dialog-start-element',
  templateUrl: './dialog-start-element.component.html',
  styleUrls: ['./dialog-start-element.component.css']
})
export class DialogStartElementComponent implements OnInit {

  constructor( @Optional() public dialogRef: MdDialogRef<DialogStartElementComponent>) { }

  ngOnInit() {
  }

}
