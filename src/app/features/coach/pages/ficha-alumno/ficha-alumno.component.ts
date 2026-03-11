import { Component, inject, OnInit, ChangeDetectionStrategy, computed } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AlumnosService } from '../../../../core/services/alumnos.service';

@Component({
  selector: 'app-ficha-alumno',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './ficha-alumno.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FichaAlumnoComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  readonly alumnosService = inject(AlumnosService);

  readonly alumnoId = this.route.snapshot.paramMap.get('id') ?? '';

  readonly alumno = computed(() =>
    this.alumnosService.alumnos().find((a) => a.id === this.alumnoId) ?? null
  );

  readonly grupoColor: Record<string, string> = {
    'Adultos mañanas': '#22c55e',
    'Adultos tarde': '#3b82f6',
    'Mujeres tarde': '#d946ef',
  };

  colorGrupo(grupo: string): string {
    return this.grupoColor[grupo] ?? '#6b705c';
  }

  toggleDoc(campo: 'med_paper' | 'consent_paper'): void {
    // TODO: conectar con el endpoint PUT /alumnos/:id
    const alumno = this.alumno();
    if (!alumno) return;
    console.log('Toggle', campo, 'para alumno', alumno.id);
    // Por ahora solo log — el backend implementará el endpoint
  }

  ngOnInit(): void {
    if (!this.alumnosService.alumnos().length) {
      this.alumnosService.cargarAlumnos();
    }
  }
}
