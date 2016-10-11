import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { AlertModule, DatepickerModule,ModalModule } from 'ng2-bootstrap/ng2-bootstrap';

import { routing } from './app.routing';
import { AppComponent } from './component/app.component';
import { SignInComponent } from './component/sign-in/sign-in.component';
import { HomeComponent } from './component/home/home.component';
import { TextboxAutocompleteDirective } from './directive/textbox-autocomplete.directive';
import { ElementListComponent } from './component/element-list/element-list.component';
import { ElementDetailComponent } from './component/element-detail/element-detail.component';
import { SigninUserInfoComponent } from './component/signin-user-info/signin-user-info.component';
import { MainHeaderComponent } from './component/main-header/main-header.component';
import { MainNavigationBarComponent } from './component/main-navigation-bar/main-navigation-bar.component';
import { CreateElementComponent } from './component/create-element/create-element.component';
import { CreateElementTaskComponent } from './component/create-element-task/create-element-task.component';
import { ModalHomeComponent } from './component/modal-home/modal-home.component';
import { ModalEmployeesChoiceComponent } from './component/modal-employees-choice/modal-employees-choice.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    HomeComponent,
    TextboxAutocompleteDirective,
    ElementListComponent,
    ElementDetailComponent,
    SigninUserInfoComponent,
    MainHeaderComponent,
    MainNavigationBarComponent,
    CreateElementComponent,
    CreateElementTaskComponent, ModalHomeComponent, ModalEmployeesChoiceComponent
  ],
  imports: [
    MaterialModule.forRoot(),
    routing,
    AlertModule,
    ModalModule,
    DatepickerModule,
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
