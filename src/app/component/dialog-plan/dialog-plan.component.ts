import { Component, OnInit, Optional } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-dialog-plan',
  templateUrl: './dialog-plan.component.html',
  styleUrls: ['./dialog-plan.component.css']
})
export class DialogPlanComponent implements OnInit {

  constructor( @Optional() public dialogRef: MdDialogRef<DialogPlanComponent>) { }

  ngOnInit() {
  }

}
