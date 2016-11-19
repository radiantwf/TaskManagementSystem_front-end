import { Component, OnInit, Optional } from '@angular/core';
import { MdDialogRef, MdDialog } from '@angular/material';

@Component({
  selector: 'app-dialog-progress-percentage',
  templateUrl: './dialog-progress-percentage.component.html',
  styleUrls: ['./dialog-progress-percentage.component.css']
})
export class DialogProgressPercentageComponent implements OnInit {

  constructor( @Optional() public dialogRef: MdDialogRef<DialogProgressPercentageComponent>) { }

  ngOnInit() {
  }

}
