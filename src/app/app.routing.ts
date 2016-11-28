import { Routes, RouterModule } from '@angular/router';

import { SignInComponent } from './component/sign-in/sign-in.component';
import { SignOutComponent } from './component/sign-out/sign-out.component';
import { HomeComponent } from './component/home/home.component';
import { ElementListComponent } from './component/element-list/element-list.component';
import { CreateElementComponent } from './component/create-element/create-element.component';
import { EditElementComponent } from './component/edit-element/edit-element.component';
import { ChangePasswordComponent } from './component/change-password/change-password.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/signin',
    pathMatch: 'full'
  },
  {
    path: 'signin',
    component: SignInComponent
  },
  {
    path: 'signout',
    component: SignOutComponent
  },
  {
    path: 'password',
    component: ChangePasswordComponent
  },
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'task/new',
        component: CreateElementComponent
      },
      {
        path: 'task',
        component: ElementListComponent,
      },
      {
        path: 'task/:page',
        component: ElementListComponent,
      },
      {
        path: 'task/:tid/:do',
        component: EditElementComponent,
      },
      {
        path: 'project/new',
        component: CreateElementComponent
      },
      {
        path: 'project',
        component: ElementListComponent,
      },
      {
        path: 'project/:page',
        component: ElementListComponent,
      },
      {
        path: 'project/:tid/:do',
        component: EditElementComponent,
      },
      {
        path: 'product/new',
        component: CreateElementComponent
      },
      {
        path: 'product',
        component: ElementListComponent,
      },
      {
        path: 'product/:page',
        component: ElementListComponent,
      },
      {
        path: 'product/:tid/:do',
        component: EditElementComponent,
      },
    ]
  }
];
export const routing = RouterModule.forRoot(appRoutes);
