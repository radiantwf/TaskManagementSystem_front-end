import { Component, OnInit, Directive, ElementRef, Renderer, Input } from '@angular/core';
import { Communication } from '../../model/communication';
import { CommunicationsService } from './../../service/communications.service';
import { Http } from '@angular/http';

@Component({
  selector: 'communications',
  templateUrl: './communications.component.html',
  styleUrls: ['./communications.component.css',
    './../element-record/element-record.component.css'],
  inputs: ['id']
})
export class CommunicationsComponent implements OnInit {
  list: Communication[] = [];
  id: string;
  content: string;
  constructor(private communicationsService: CommunicationsService) { }

  ngOnInit() {
    this.communicationsService.getCommunicationsById(this.id)
      .then(list => this.list = list);
  }

  addCommunication() {
    if (!this.content) { return; }
    var communication = new Communication(this.id, null, new Date(Date.now()), this.content);

    this.communicationsService.create(communication).then(() =>
      this.communicationsService.getCommunicationsById(this.id)
        .then(list => this.list = list)
    );
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