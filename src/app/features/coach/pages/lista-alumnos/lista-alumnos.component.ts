import { Component, inject, OnInit, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AlumnosService } from '../../../../core/services/alumnos.service';
import { Alumno } from '../../../../core/models/alumno.model';

const GRUPO_COLORS: Record<string, string> = {
  'Adultos mañanas': '#22c55e',
  'Adultos tarde': '#3b82f6',
  'Mujeres tarde': '#d946ef',
};

@Component({
  selector: 'app-lista-alumnos-coach',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './lista-alumnos.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListaAlumnosComponent implements OnInit {
  readonly alumnosService = inject(AlumnosService);
  readonly busqueda = signal('');

  // Formulario nuevo alumno
  readonly mostrandoFormulario = signal(false);
  readonly nuevoAlumno = signal<Partial<Alumno>>({ 
    nombre: '', 
    dni: '', 
    grupo: '',
    rol: 'alumno' // Necesario para el backend
  } as Partial<Alumno> & { rol: string });

  readonly grupoColors = GRUPO_COLORS;
  readonly grupos = computed(() => Object.keys(GRUPO_COLORS));

  crearAlumno(): void {
    const data = this.nuevoAlumno();
    if (!data.nombre || !data.dni) return;
    this.alumnosService.crearAlumno(data);
    this.mostrandoFormulario.set(false);
    this.nuevoAlumno.set({ nombre: '', dni: '', grupo: '', rol: 'alumno' } as any);
  }

  readonly alumnosFiltrados = computed(() => {
    const term = this.busqueda().toLowerCase().trim();
    if (!term) return this.alumnosService.alumnos();
    return this.alumnosService.alumnos().filter(
      (a) =>
        a.nombre.toLowerCase().includes(term) ||
        a.dni.toLowerCase().includes(term) ||
        a.short_id.toLowerCase().includes(term)
    );
  });

  alumnosPorGrupo(grupo: string): Alumno[] {
    return this.alumnosFiltrados().filter((a) => a.grupo === grupo);
  }

  colorGrupo(grupo: string): string {
    return GRUPO_COLORS[grupo] ?? '#6b705c';
  }

  ngOnInit(): void {
    this.alumnosService.cargarAlumnos();
  }
}
