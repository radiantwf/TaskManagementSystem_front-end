import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  private router: Router;

  constructor() {
  }

  ngOnInit() {
  }

  model = new User('', '');

  submitted = false;

  onSubmit() {
    this.submitted = true;
  }

  onClick() {
    this.router.navigate(['/home', '1``']);
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }

  // Reset the form with a new hero AND restore 'pristine' class state
  // by toggling 'active' flag which causes the form
  // to be removed/re-added in a tick via NgIf
  // TODO: Workaround until NgForm has a reset method (#6822)
  active = true;
}

export class User {
  constructor(
    public name: string,
    public pwd: string
  ) { }
}
