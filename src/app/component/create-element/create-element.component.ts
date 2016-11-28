import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'create-element',
  templateUrl: './create-element.component.html',
  styleUrls: ['./create-element.component.css']
})
export class CreateElementComponent implements OnInit {
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
