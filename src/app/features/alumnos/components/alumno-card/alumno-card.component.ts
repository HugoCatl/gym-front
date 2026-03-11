import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { Alumno } from '../../../../core/models/alumno.model';

@Component({
  selector: 'app-alumno-card',
  standalone: true,
  imports: [],
  templateUrl: './alumno-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlumnoCardComponent {
  readonly alumno = input.required<Alumno>();
}
