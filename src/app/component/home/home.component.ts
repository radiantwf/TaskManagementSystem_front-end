import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  active_create_element = false;
  active_browse_element = true;

  constructor(
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {
    // alert(this.route.firstChild.toString());
  }
}
