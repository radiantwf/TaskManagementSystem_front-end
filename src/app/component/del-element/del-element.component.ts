import { Component, OnInit,Optional } from '@angular/core';
import { MdDialogRef, MdDialog } from '@angular/material';

@Component({
  selector: 'del-element',
  templateUrl: './del-element.component.html',
  styleUrls: ['./del-element.component.css']
})
export class DelElementComponent implements OnInit {

  constructor( @Optional() public dialogRef: MdDialogRef<DelElementComponent>) { }

  ngOnInit() {
  }

}
