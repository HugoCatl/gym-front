import { Routes } from '@angular/router';

export const asistenciasRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/registro-asistencia/registro-asistencia.component').then(
        (m) => m.RegistroAsistenciaComponent
      ),
  },
];
