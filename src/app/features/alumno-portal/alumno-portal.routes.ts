import { Routes } from '@angular/router';
import { alumnoGuard } from '../../core/guards/alumno.guard';

export const alumnoPortalRoutes: Routes = [
  {
    path: '',
    canActivate: [alumnoGuard],
    loadComponent: () =>
      import('./layout/alumno-layout.component').then((m) => m.AlumnoLayoutComponent),
    children: [
      { path: '', redirectTo: 'clase', pathMatch: 'full' },
      {
        path: 'clase',
        loadComponent: () =>
          import('./pages/proxima-clase/proxima-clase.component').then(
            (m) => m.ProximaClaseComponent
          ),
      },
    ],
  },
];
