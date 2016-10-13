import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { SignInComponent } from './component/sign-in/sign-in.component';
import { HomeComponent } from './component/home/home.component';
import { ElementListComponent } from './component/element-list/element-list.component';
import { CreateElementComponent } from './component/create-element/create-element.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/task',
    pathMatch: 'full'
  },
  {
    path: 'signin',
    component: SignInComponent
  },
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'task',
        component: ElementListComponent
      },
      {
        path: 'task/new',
        component: CreateElementComponent
      }
    ]
  }
];
export const routing = RouterModule.forRoot(appRoutes);
