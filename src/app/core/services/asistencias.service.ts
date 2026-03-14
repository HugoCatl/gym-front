import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Asistencia, AsistenciasApiResponse } from '../models/asistencia.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AsistenciasService {
  private readonly http = inject(HttpClient);

  private readonly _asistencias = signal<Asistencia[]>([]);
  private readonly _loading = signal(false);
  private readonly _error = signal<string | null>(null);

  readonly asistencias = this._asistencias.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  // Estadísicas
  private readonly _estadisticas = signal<{ asistenciasEsteMes: number }>({ asistenciasEsteMes: 0 });
  readonly estadisticas = this._estadisticas.asReadonly();

  registrarAsistencia(alumnoId: string, metodo: 'qr' | 'button'): void {
    this._loading.set(true);
    this._error.set(null);

    this.http
      .post<AsistenciasApiResponse>(`${environment.apiUrl}/asistencias`, { alumno_id: alumnoId, metodo })
      .subscribe({
        next: () => {
          this._loading.set(false);
          // Actualizamos localmente para dar feedback inmediato al usuario
          this._estadisticas.update(s => ({ asistenciasEsteMes: s.asistenciasEsteMes + 1 }));
        },
        error: (err) => {
          this._error.set('Error al registrar asistencia');
          this._loading.set(false);
          console.error(err);
        },
      });
  }

  cargarEstadisticas(usuarioId: string): void {
    this._loading.set(true);
    this.http.get<{status: string, data: {asistenciasEsteMes: number}}>(
      `${environment.apiUrl}/estadisticas/${usuarioId}`
    ).subscribe({
      next: (res) => {
        this._estadisticas.set({ asistenciasEsteMes: res.data.asistenciasEsteMes });
        this._loading.set(false);
      },
      error: (err) => {
        console.error('Error al cargar estadísticas', err);
        this._loading.set(false);
      }
    });
  }
}
