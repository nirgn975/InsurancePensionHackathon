import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ProfileComponent } from './profile/profile.component';
import { ChartComponent } from './chart/chart.component';

import { LoginGuard } from './login/login.guard';
import { ProfileGuard } from './profile/profile.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'registration',
    component: RegistrationComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [ProfileGuard],
    children: [
      { path: ':category', component: ChartComponent, },
    ],
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
