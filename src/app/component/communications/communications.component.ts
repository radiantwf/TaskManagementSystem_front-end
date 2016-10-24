import { Component, OnInit, Directive, ElementRef, Renderer, Input } from '@angular/core';
import { Communication } from '../../model/communication';
import { CommunicationsService } from './../../service/communications.service';
import { Http } from '@angular/http';

@Component({
  selector: 'communications',
  templateUrl: './communications.component.html',
  styleUrls: ['./communications.component.css',
    './../element-record/element-record.component.css'],
  inputs: ['list', 'id']
})
export class CommunicationsComponent implements OnInit {
  list: Communication[];
  id: string;
  content: string;
  constructor(private http: Http) { }

  ngOnInit() {
  }

  addCommunication() {
    if (!this.content) { return; }
    var communicationsService = new CommunicationsService(this.http, this.id);
    communicationsService.create(this.content).then(communication => {
      this.list.push(communication);
    });
  }
}

@Directive({ selector: '[person]' })
export class CommunicationsDirective {
  @Input('person') person: string;

  @Input('person') set myperson(person: string) {
    if (this.person == null) {
      this.renderer.setElementAttribute(this.el.nativeElement, 'class', 'me');
    } else {
      this.renderer.setElementAttribute(this.el.nativeElement, 'class', 'other');
    }
  }

  constructor(private el: ElementRef, private renderer: Renderer) {
  }

}