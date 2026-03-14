import { Component, inject, OnInit, ChangeDetectionStrategy, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AlumnosService } from '../../../../core/services/alumnos.service';
import { AsistenciasService } from '../../../../core/services/asistencias.service';
import { ClasesService, Clase } from '../../../../core/services/clases.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  readonly alumnosService = inject(AlumnosService);
  readonly asistenciasService = inject(AsistenciasService);
  readonly clasesService = inject(ClasesService);

  readonly hoy = new Date().toLocaleDateString('es-ES', {
    weekday: 'long', day: 'numeric', month: 'long'
  });

  // Formulario nueva clase
  readonly mostrandoFormulario = signal(false);
  readonly nuevaClase = signal<Clase>({ titulo: '', fecha: '', horario: '', color: '' });

  // Clases programadas (ahora desde el backend)
  readonly clasesHoy = this.clasesService.clases;

  crearClase(): void {
    const data = this.nuevaClase();
    if (!data.titulo || !data.fecha) return;
    this.clasesService.crearClase(data);
    this.mostrandoFormulario.set(false);
    this.nuevaClase.set({ titulo: '', fecha: '', horario: '', color: '' });
  }

  ngOnInit(): void {
    this.alumnosService.cargarAlumnos();
    this.clasesService.cargarClases();
  }
}
