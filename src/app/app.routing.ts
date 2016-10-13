import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { SignInComponent } from './component/sign-in/sign-in.component';
import { HomeComponent } from './component/home/home.component';
import { ElementListComponent } from './component/element-list/element-list.component';

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
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'task/:id',
    component: HomeComponent
  }
];

const homeRoutes: Routes = [
  {
    path: 'task',
    component: ElementListComponent
  },
  {
    path: 'task/:id',
    component: ElementListComponent
  }
];
export const routing = RouterModule.forRoot(appRoutes);
