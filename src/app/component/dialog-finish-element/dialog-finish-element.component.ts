import { Component, OnInit, Optional } from '@angular/core';
import { MdDialogRef, MdDialog } from '@angular/material';

@Component({
  selector: 'app-dialog-finish-element',
  templateUrl: './dialog-finish-element.component.html',
  styleUrls: ['./dialog-finish-element.component.css']
})
export class DialogFinishElementComponent implements OnInit {

  constructor( @Optional() public dialogRef: MdDialogRef<DialogFinishElementComponent>) { }

  ngOnInit() {
  }

}
