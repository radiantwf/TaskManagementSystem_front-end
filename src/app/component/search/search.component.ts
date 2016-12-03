import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchCriteria: string = '';
  constructor(
    private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }
  search(event) {
    if (event.keyCode === 13 && this.searchCriteria !== '') {
      let reg = new RegExp('/[a-zA-Z0-9]+');
      let r = reg.exec(this.router.url);
      if (r != null) {
        let elementType = r[0].toString().substring(1).toLowerCase();
        this.router.navigate([elementType, { searchCriteria: this.searchCriteria }]);
      }
    }
  }
}
