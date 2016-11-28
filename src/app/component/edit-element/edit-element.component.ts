import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'edit-element',
  templateUrl: './edit-element.component.html',
  styleUrls: ['./edit-element.component.css']
})
export class EditElementComponent implements OnInit {
  elementType: string = '';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.url.subscribe(value => {
      this.elementType = value[0].path.toLowerCase();
    });
  }
}
