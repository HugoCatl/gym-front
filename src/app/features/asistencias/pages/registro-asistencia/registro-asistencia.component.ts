import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { AsistenciasService } from '../../../../core/services/asistencias.service';
import { AlumnosService } from '../../../../core/services/alumnos.service';

@Component({
  selector: 'app-registro-asistencia',
  standalone: true,
  imports: [],
  templateUrl: './registro-asistencia.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistroAsistenciaComponent {
  readonly asistenciasService = inject(AsistenciasService);
  readonly alumnosService = inject(AlumnosService);

  registrar(alumnoId: string): void {
    this.asistenciasService.registrarAsistencia(alumnoId, 'button');
  }
}
