import { Component, OnInit, Optional } from '@angular/core';
import { MdDialogRef, MdDialog } from '@angular/material';

@Component({
  selector: 'dialog-del-element',
  templateUrl: './dialog-del-element.component.html',
  styleUrls: ['../dialog/dialog.component.css',
    './dialog-del-element.component.css']
})
export class DialogDelElementComponent implements OnInit {

  constructor( @Optional() public dialogRef: MdDialogRef<DialogDelElementComponent>) { }

  ngOnInit() {
  }

}
