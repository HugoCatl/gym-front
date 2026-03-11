import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Alumno, AlumnosApiResponse } from '../models/alumno.model';

@Injectable({ providedIn: 'root' })
export class AlumnosService {
  private readonly http = inject(HttpClient);

  // Estado central con signals
  private readonly _alumnos = signal<Alumno[]>([]);
  private readonly _loading = signal(false);
  private readonly _error = signal<string | null>(null);

  // Señales públicas de solo lectura
  readonly alumnos = this._alumnos.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  // Computed
  readonly total = computed(() => this._alumnos().length);
  readonly grupos = computed(() => [
    ...new Set(this._alumnos().map((a) => a.grupo)),
  ]);

  cargarAlumnos(): void {
    this._loading.set(true);
    this._error.set(null);

    this.http.get<AlumnosApiResponse>('/').subscribe({
      next: (res) => {
        this._alumnos.set(res.data);
        this._loading.set(false);
      },
      error: (err) => {
        this._error.set('Error al cargar los alumnos');
        this._loading.set(false);
        console.error(err);
      },
    });
  }
}
