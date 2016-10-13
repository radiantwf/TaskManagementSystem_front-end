import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'element-record',
  templateUrl: './element-record.component.html',
  styleUrls: ['./element-record.component.css'],
  inputs: ['taskRecord']
})
export class ElementRecordComponent implements OnInit {
  private detailFlag = false;

  constructor() { }

  ngOnInit() {
  }
  switchDetail(){
    this.detailFlag = !this.detailFlag;
  }
}
