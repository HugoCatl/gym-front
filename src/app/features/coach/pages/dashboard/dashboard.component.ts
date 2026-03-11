import { Component, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AlumnosService } from '../../../../core/services/alumnos.service';
import { AsistenciasService } from '../../../../core/services/asistencias.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  readonly alumnosService = inject(AlumnosService);
  readonly asistenciasService = inject(AsistenciasService);

  readonly hoy = new Date().toLocaleDateString('es-ES', {
    weekday: 'long', day: 'numeric', month: 'long'
  });

  // Clases programadas (hardcoded por ahora — se conectará al backend)
  readonly clasesHoy = [
    { hora: '10:00 – 11:00', grupo: 'Adultos mañanas', color: '#22c55e' },
    { hora: '17:30 – 18:30', grupo: 'Adultos tarde', color: '#3b82f6' },
  ];

  ngOnInit(): void {
    this.alumnosService.cargarAlumnos();
  }
}
