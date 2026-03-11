import { Routes } from '@angular/router';
import { coachGuard } from '../../core/guards/coach.guard';

export const coachRoutes: Routes = [
  {
    path: '',
    canActivate: [coachGuard],
    loadComponent: () =>
      import('./layout/coach-layout.component').then((m) => m.CoachLayoutComponent),
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard/dashboard.component').then((m) => m.DashboardComponent),
      },
      {
        path: 'alumnos',
        loadComponent: () =>
          import('./pages/lista-alumnos/lista-alumnos.component').then((m) => m.ListaAlumnosComponent),
      },
      {
        path: 'alumnos/:id',
        loadComponent: () =>
          import('./pages/ficha-alumno/ficha-alumno.component').then((m) => m.FichaAlumnoComponent),
      },
      {
        path: 'historial',
        loadComponent: () =>
          import('./pages/historial/historial.component').then((m) => m.HistorialComponent),
      },
    ],
  },
];
