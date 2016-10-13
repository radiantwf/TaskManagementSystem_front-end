import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './component/app.component';
import { SignInComponent } from './component/sign-in/sign-in.component';
import { HomeComponent } from './component/home/home.component';

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
    path: 'task',
    component: HomeComponent
  },
  {
    path: 'task/:id',
    component: HomeComponent
  }
];

export const routing = RouterModule.forRoot(appRoutes);