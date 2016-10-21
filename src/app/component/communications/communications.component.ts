import { Component, OnInit, Directive, ElementRef, Renderer, Input } from '@angular/core';
import { Communication } from '../../model/communication';

@Component({
  selector: 'communications',
  templateUrl: './communications.component.html',
  styleUrls: ['./communications.component.css',
    './../element-record/element-record.component.css'],
  inputs: ['list']
})
export class CommunicationsComponent implements OnInit {
  list: Communication[];
  constructor() { }

  ngOnInit() {
  }

}

@Directive({ selector: '[person]' })
export class CommunicationsDirective {
  el: ElementRef;
  renderer: Renderer;
  @Input('person') person: string;

  @Input('person') set myperson(person: string) {
    if (this.person == null) {
      this.renderer.setElementAttribute(this.el.nativeElement, 'class', 'me');
    } else {
      this.renderer.setElementAttribute(this.el.nativeElement, 'class', 'other');
    }
  }

  constructor(el: ElementRef, renderer: Renderer) {
    this.el = el;
    this.renderer = renderer;
  }
  
  addCommunication(){

  }
}