import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'main-navigation-bar',
  templateUrl: './main-navigation-bar.component.html',
  styleUrls: ['./main-navigation-bar.component.css']
})
export class MainNavigationBarComponent implements OnInit {

  constructor(private router: Router) {
  }
  ngOnInit() {
  }
  navigateToCreateTask() {
    this.router.navigate(['/task/new']);
  }
  navigateToTaskList() {
    this.router.navigate(['/task']);
  }
  navigateToCreateProduct() {
    this.router.navigate(['/product/new']);
  }
  navigateToProductList() {
    this.router.navigate(['/product']);
  }
  navigateToCreateProject() {
    this.router.navigate(['/project/new']);
  }
  navigateToProjectList() {
    this.router.navigate(['/project']);
  }
  navigateToHomePage() {
    this.router.navigate(['/']);
  }
  navigateToSignOut() {
    this.router.navigate(['/signout']);
  }
}
