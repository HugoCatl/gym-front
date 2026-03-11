import { Routes } from '@angular/router';

export const alumnosRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/lista-alumnos/lista-alumnos.component').then(
        (m) => m.ListaAlumnosComponent
      ),
  },
];
