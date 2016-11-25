import { Component, OnInit, Optional } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-dialog-close-element',
  templateUrl: './dialog-close-element.component.html',
  styleUrls: ['./dialog-close-element.component.css']
})
export class DialogCloseElementComponent implements OnInit {

  constructor( @Optional() public dialogRef: MdDialogRef<DialogCloseElementComponent>) { }

  ngOnInit() {
  }

}
