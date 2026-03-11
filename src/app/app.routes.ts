import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./features/auth/auth.routes').then((m) => m.authRoutes),
  },
  {
    path: 'coach',
    loadChildren: () =>
      import('./features/coach/coach.routes').then((m) => m.coachRoutes),
  },
  {
    path: 'alumno',
    loadChildren: () =>
      import('./features/alumno-portal/alumno-portal.routes').then(
        (m) => m.alumnoPortalRoutes
      ),
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
