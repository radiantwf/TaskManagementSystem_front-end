import { Component, OnInit, Directive, ElementRef, Renderer, Input } from '@angular/core';
import { Communication } from '../../model/communication';
import { AppGlobal } from '../../shared/app-global';
import { UserService } from './../../service/user.service';

import { CommunicationsService } from './../../service/communications.service';

@Component({
  selector: 'communications',
  templateUrl: './communications.component.html',
  styleUrls: ['./communications.component.css']
})
export class CommunicationsComponent implements OnInit {
  list: Communication[] = [];
  empId: string;
  @Input() id: string;
  content: string;
  constructor(private communicationsService: CommunicationsService,
    private userService: UserService) { }

  ngOnInit() {
    this.empId = this.userService.currentUser.empId;
    this.communicationsService.getCommunicationsById(this.id)
      .then(list => this.list = list);
  }

  addCommunication() {
    if (!this.content) { return; }
    let communication = new Communication(this.id, this.userService.currentUser.empId, null, new Date(Date.now()), this.content);

    this.communicationsService.create(communication).then(() => {
      this.communicationsService.getCommunicationsById(this.id)
        .then(list => this.list = list);
      this.content = '';
    });
  }
}

@Directive({ selector: '[personId]' })
export class CommunicationsDirective {
  @Input('personId') personId: string;

  @Input('personId') set myperson(personId: string) {
    if (this.personId === this.userService.currentUser.empId) {
      this.renderer.setElementAttribute(this.el.nativeElement, 'class', 'me');
    } else {
      this.renderer.setElementAttribute(this.el.nativeElement, 'class', 'other');
    }
  }

  constructor(private el: ElementRef, private renderer: Renderer, private userService: UserService) {
  }

}