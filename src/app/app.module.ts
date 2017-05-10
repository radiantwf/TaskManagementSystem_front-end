import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations'
// import { AlertModule, DatepickerModule, ModalModule } from 'ngx-bootstrap';

// import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { SignInComponent } from './component/sign-in/sign-in.component';
import { HomeComponent } from './component/home/home.component';
import { TextboxAutocompleteDirective } from './directive/textbox-autocomplete.directive';
import { ElementListComponent } from './component/element-list/element-list.component';
import { ElementTaskComponent } from './component/element-task/element-task.component';
import { ElementTaskHeaderComponent } from './component/element-task-header/element-task-header.component';
import { ElementTaskDetailComponent } from './component/element-task-detail/element-task-detail.component';
import { SigninUserInfoComponent } from './component/signin-user-info/signin-user-info.component';
import { MainHeaderComponent } from './component/main-header/main-header.component';
import { MainNavigationBarComponent } from './component/main-navigation-bar/main-navigation-bar.component';
import { CreateElementComponent } from './component/create-element/create-element.component';
import { CreateElementTaskComponent } from './component/create-element-task/create-element-task.component';
import { ProgressChartComponent } from './component/progress-chart/progress-chart.component';
import { ProgressChart2Component } from './component/progress-chart-2/progress-chart-2.component';
import { CommunicationsComponent, CommunicationsDirective } from './component/communications/communications.component';
import { SearchComponent } from './component/search/search.component';
import { SignOutComponent } from './component/sign-out/sign-out.component';
import { EditElementTaskComponent } from './component/edit-element-task/edit-element-task.component';
import { EditElementComponent } from './component/edit-element/edit-element.component';
import { DialogDelElementComponent } from './component/dialog-del-element/dialog-del-element.component';
import { ElementStatusDirective } from './directive/element-status.directive';

import { TaskService } from './service/task.service';
import { ProjectService } from './service/project.service';
import { ProductService } from './service/product.service';
import { CommunicationsService } from './service/communications.service';
import { UserService } from './service/user.service';
import { EmployeeService } from './service/employee.service';
import { CookiesService } from './service/cookies.service';
import { MainHeaderService } from './service/main-header.service';
import { AttachmentService } from './service/attachment.service';
// import { InMemoryDataService } from './service/in-memory-data.service';
import { NullOrEmptyPipe } from './pipe/null-or-empty.pipe';
import { DialogStartElementComponent } from './component/dialog-start-element/dialog-start-element.component';
import { DialogFinishElementComponent } from './component/dialog-finish-element/dialog-finish-element.component';
import { DialogProgressPercentageComponent } from './component/dialog-progress-percentage/dialog-progress-percentage.component';
import { DialogCloseElementComponent } from './component/dialog-close-element/dialog-close-element.component';
import { DialogPlanTaskComponent } from './component/dialog-plan-task/dialog-plan-task.component';
import { DialogAssignTaskComponent } from './component/dialog-assign-task/dialog-assign-task.component';
import { DialogRefuseTaskComponent } from './component/dialog-refuse-task/dialog-refuse-task.component';
import { CreateElementProjectComponent } from './component/create-element-project/create-element-project.component';
import { CreateElementProductComponent } from './component/create-element-product/create-element-product.component';
import { EditElementProductComponent } from './component/edit-element-product/edit-element-product.component';
import { EditElementProjectComponent } from './component/edit-element-project/edit-element-project.component';
import { ElementProjectHeaderComponent } from './component/element-project-header/element-project-header.component';
import { ElementProjectDetailComponent } from './component/element-project-detail/element-project-detail.component';
import { ElementProductHeaderComponent } from './component/element-product-header/element-product-header.component';
import { ElementProductDetailComponent } from './component/element-product-detail/element-product-detail.component';
import { ElementProjectComponent } from './component/element-project/element-project.component';
import { ElementProductComponent } from './component/element-product/element-product.component';
import { ChangePasswordComponent } from './component/change-password/change-password.component';
import { AttachmentsComponent } from './component/attachments/attachments.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    HomeComponent,
    TextboxAutocompleteDirective,
    CommunicationsDirective,
    NullOrEmptyPipe,
    ElementListComponent,
    ElementTaskComponent,
    ElementTaskHeaderComponent,
    ElementTaskDetailComponent,
    SigninUserInfoComponent,
    MainHeaderComponent,
    MainNavigationBarComponent,
    CreateElementComponent,
    CreateElementTaskComponent,
    ProgressChartComponent,
    ProgressChart2Component,
    CommunicationsComponent,
    SearchComponent,
    SignOutComponent,
    EditElementTaskComponent,
    EditElementComponent,
    DialogDelElementComponent,
    DialogStartElementComponent,
    DialogFinishElementComponent,
    DialogProgressPercentageComponent,
    DialogCloseElementComponent,
    DialogPlanTaskComponent,
    DialogAssignTaskComponent,
    DialogRefuseTaskComponent,
    CreateElementProjectComponent,
    CreateElementProductComponent,
    EditElementProductComponent,
    EditElementProjectComponent,
    ElementProjectHeaderComponent,
    ElementProjectDetailComponent,
    ElementProductHeaderComponent,
    ElementProductDetailComponent,
    ChangePasswordComponent,
    ElementProjectComponent,
    ElementProductComponent,
    ElementStatusDirective,
    AttachmentsComponent,
  ],
  imports: [
    MaterialModule.forRoot(),
    AppRoutingModule,
    // AlertModule,
    // ModalModule,
    // DatepickerModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    BrowserModule,
    FormsModule,
    // InMemoryWebApiModule.forRoot(InMemoryDataService),
    HttpModule,
  ],
  entryComponents: [
    DialogDelElementComponent,
    DialogStartElementComponent,
    DialogFinishElementComponent,
    DialogProgressPercentageComponent,
    DialogCloseElementComponent,
    DialogPlanTaskComponent,
    DialogAssignTaskComponent,
    DialogRefuseTaskComponent,
  ],
  providers: [
    TaskService,
    ProductService,
    ProjectService,
    CommunicationsService,
    MainHeaderService,
    UserService,
    EmployeeService,
    CookiesService,
    AttachmentService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
