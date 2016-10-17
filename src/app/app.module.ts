import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { AlertModule, DatepickerModule, ModalModule } from 'ng2-bootstrap/ng2-bootstrap';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { SignInComponent } from './component/sign-in/sign-in.component';
import { HomeComponent } from './component/home/home.component';
import { TextboxAutocompleteDirective } from './directive/textbox-autocomplete.directive';
import { ElementListComponent } from './component/element-list/element-list.component';
import { ElementRecordComponent } from './component/element-record/element-record.component';
import { ElementRecordDetailComponent } from './component/element-record-detail/element-record-detail.component';
import { SigninUserInfoComponent } from './component/signin-user-info/signin-user-info.component';
import { MainHeaderComponent } from './component/main-header/main-header.component';
import { MainNavigationBarComponent } from './component/main-navigation-bar/main-navigation-bar.component';
import { CreateElementComponent } from './component/create-element/create-element.component';
import { CreateElementTaskComponent } from './component/create-element-task/create-element-task.component';
import { ModalHomeComponent } from './component/modal-home/modal-home.component';
import { ModalEmployeesChoiceComponent } from './component/modal-employees-choice/modal-employees-choice.component';
import { ProgressChartComponent } from './component/progress-chart/progress-chart.component';

import { TaskService } from './service/task.service';
import { InMemoryDataService } from './service/in-memory-data.service';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    HomeComponent,
    TextboxAutocompleteDirective,
    ElementListComponent,
    ElementRecordComponent,
    ElementRecordDetailComponent,
    SigninUserInfoComponent,
    MainHeaderComponent,
    MainNavigationBarComponent,
    CreateElementComponent,
    CreateElementTaskComponent, 
    ModalHomeComponent, 
    ModalEmployeesChoiceComponent,
    ProgressChartComponent
  ],
  imports: [
    MaterialModule.forRoot(),
    routing,
    AlertModule,
    ModalModule,
    DatepickerModule,
    BrowserModule,
    FormsModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    HttpModule
  ],
  providers: [TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
