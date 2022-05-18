import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login-page/login-page.module').then(
        (m) => m.LoginPageModule
      ),
  },
  {
    path: 'registration',
    loadChildren: () =>
      import('./pages/registration-page/registration-page.module').then(
        (m) => m.RegistrationPageModule
      ),
  },
  {
    path: 'account',
    loadChildren: () =>
      import('./pages/account-page/account-page.module').then(
        (m) => m.AccountPageModule
      ),
  },
  {
    path: 'error',
    loadChildren: () =>
      import('./pages/error-page/error-page.module').then(
        (m) => m.ErrorPageModule
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('./pages/main-dashboard/main-page.module').then(
        (m) => m.MainPageModule
      ),
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'error',
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
