import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { AlumnosService } from '../../../../core/services/alumnos.service';
import { AlumnoCardComponent } from '../../components/alumno-card/alumno-card.component';

@Component({
  selector: 'app-lista-alumnos',
  standalone: true,
  imports: [AlumnoCardComponent],
  templateUrl: './lista-alumnos.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListaAlumnosComponent implements OnInit {
  readonly alumnosService = inject(AlumnosService);

  ngOnInit(): void {
    this.alumnosService.cargarAlumnos();
  }
}

