import { Component, inject, signal, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { AsistenciasService } from '../../../core/services/asistencias.service';

@Component({
  selector: 'app-alumno-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './alumno-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlumnoLayoutComponent implements OnInit {
  readonly auth = inject(AuthService);
  readonly asistenciasSvc = inject(AsistenciasService);
  readonly sidebarOpen = signal(false);

  ngOnInit() {
    const userId = this.auth.usuario()?.id;
    if (userId) {
      this.asistenciasSvc.cargarEstadisticas(userId);
    }
  }

  logout(): void {
    this.auth.logout();
  }
}
