import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-alumno-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './alumno-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlumnoLayoutComponent {
  readonly auth = inject(AuthService);
  readonly sidebarOpen = signal(false);

  logout(): void {
    this.auth.logout();
  }
}
