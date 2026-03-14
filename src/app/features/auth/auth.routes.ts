import { Routes } from '@angular/router';

export const authRoutes: Routes = [
  {
    path: '', // Este matcheará /login inicialmente, o redirigiremos apropiadamente. Pero /login está mapeado a 'auth' en app.routes.ts.
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register.component').then((m) => m.RegisterComponent),
  },
];
