import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Asistencia, AsistenciasApiResponse } from '../models/asistencia.model';

@Injectable({ providedIn: 'root' })
export class AsistenciasService {
  private readonly http = inject(HttpClient);

  private readonly _asistencias = signal<Asistencia[]>([]);
  private readonly _loading = signal(false);
  private readonly _error = signal<string | null>(null);

  readonly asistencias = this._asistencias.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  registrarAsistencia(alumnoId: string, metodo: 'qr' | 'button'): void {
    this._loading.set(true);
    this._error.set(null);

    this.http
      .post<AsistenciasApiResponse>('/asistencias', { alumno_id: alumnoId, metodo })
      .subscribe({
        next: () => {
          this._loading.set(false);
        },
        error: (err) => {
          this._error.set('Error al registrar asistencia');
          this._loading.set(false);
          console.error(err);
        },
      });
  }
}
