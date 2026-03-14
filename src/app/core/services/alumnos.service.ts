import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Alumno, AlumnosApiResponse } from '../models/alumno.model';
import { environment } from '../../../environments/environment';

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
    ...new Set(this._alumnos().map((a) => a.grupo).filter(g => !!g)),
  ]);

  cargarAlumnos(): void {
    this._loading.set(true);
    this._error.set(null);

    this.http.get<any>(`${environment.apiUrl}/usuarios`).subscribe({
      next: (res) => {
        const data = res.data || res; // depending on whether it's wrapped in { data: [] }
        this._alumnos.set(data);
        this._loading.set(false);
      },
      error: (err) => {
        this._error.set('Error al cargar los alumnos');
        this._loading.set(false);
        console.error(err);
      },
    });
  }

  crearAlumno(datos: Partial<Alumno>): void {
    this._loading.set(true);
    this.http.post<any>(`${environment.apiUrl}/usuarios`, datos).subscribe({
      next: (res) => {
        const nuevoAlumno = res.data || res;
        this._alumnos.update(alumnos => [...alumnos, nuevoAlumno]);
        this._loading.set(false);
      },
      error: (err) => {
        this._error.set('Error al crear alumno');
        this._loading.set(false);
        console.error(err);
      }
    });
  }

  actualizarAlumno(id: string, datos: Partial<Alumno>): void {
    this._loading.set(true);
    this.http.put<any>(`${environment.apiUrl}/usuarios/${id}`, datos).subscribe({
      next: (res) => {
        const actualizado = res.data || res;
        // Asume que actualizado u original tiene la data unida
        this._alumnos.update(alumnos => 
          alumnos.map(a => a.id === id ? { ...a, ...actualizado } : a)
        );
        this._loading.set(false);
      },
      error: (err) => {
        this._error.set('Error al actualizar alumno');
        this._loading.set(false);
        console.error(err);
      }
    });
  }
}
