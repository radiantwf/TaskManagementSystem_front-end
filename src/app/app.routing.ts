import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { SignInComponent } from './component/sign-in/sign-in.component';
import { SignOutComponent } from './component/sign-out/sign-out.component';
import { HomeComponent } from './component/home/home.component';
import { ElementListComponent } from './component/element-list/element-list.component';
import { ElementRecordComponent } from './component/element-record/element-record.component';
import { CreateElementComponent } from './component/create-element/create-element.component';

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
        path: 'task/:tid/process',
        component: CreateElementComponent,
      },
    ]
  }
];
export const routing = RouterModule.forRoot(appRoutes);
