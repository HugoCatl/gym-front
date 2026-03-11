import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-proxima-clase',
  standalone: true,
  imports: [],
  templateUrl: './proxima-clase.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProximaClaseComponent {
  readonly auth = inject(AuthService);
  readonly apuntado = signal(false);

  // Próxima clase calculada (hardcoded por ahora — se conectará al backend)
  readonly proximaClase = {
    dia: 'Martes',
    fecha: '11 de marzo',
    horario: '10:00 a 11:00',
    grupo: 'Adultos mañanas',
    color: '#22c55e',
  };

  apuntarse(): void {
    if (this.apuntado()) return;
    this.apuntado.set(true);
    // TODO: llamar al endpoint POST /asistencias
  }
}
