import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export interface Clase {
  id?: number | string;
  titulo: string;
  fecha: string;
  horario?: string;
  grupo?: string;
  color?: string;
}

export interface Reserva {
  id?: number | string;
  usuario_id: string; // Puede venir como usuarioId o usuario_id from API
  clase_id: number | string;
}

@Injectable({ providedIn: 'root' })
export class ClasesService {
  private readonly http = inject(HttpClient);

  private readonly _clases = signal<Clase[]>([]);
  private readonly _reservas = signal<Reserva[]>([]);
  private readonly _loading = signal(false);
  private readonly _error = signal<string | null>(null);

  readonly clases = this._clases.asReadonly();
  readonly reservas = this._reservas.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  cargarClases(): void {
    this._loading.set(true);
    this.http.get<any>(`${environment.apiUrl}/clases`).subscribe({
      next: (res) => {
        const data = res.data || res || [];
        this._clases.set(data);
        this._loading.set(false);
      },
      error: (err) => {
        this._error.set('Error al cargar clases');
        this._loading.set(false);
        console.error(err);
      }
    });
  }

  crearClase(clase: Clase): void {
    this._loading.set(true);
    this.http.post<any>(`${environment.apiUrl}/clases`, clase).subscribe({
      next: (res) => {
        const nuevaClase = res.data || res;
        this._clases.update(clases => [...clases, nuevaClase]);
        this._loading.set(false);
      },
      error: (err) => {
        this._error.set('Error al crear clase');
        this._loading.set(false);
        console.error(err);
      }
    });
  }

  cargarReservas(usuarioId?: string): void {
    const url = usuarioId 
      ? `${environment.apiUrl}/reservas?usuarioId=${usuarioId}`
      : `${environment.apiUrl}/reservas`;
    
    this._loading.set(true);
    this.http.get<any>(url).subscribe({
      next: (res) => {
        const data = res.data || res || [];
        this._reservas.set(data);
        this._loading.set(false);
      },
      error: (err) => {
        this._error.set('Error al cargar reservas');
        this._loading.set(false);
        console.error(err);
      }
    });
  }

  reservarClase(usuarioId: string, claseId: number | string): void {
    this._loading.set(true);
    this.http.post<any>(`${environment.apiUrl}/reservas`, { usuarioId, claseId }).subscribe({
      next: (res) => {
        const nuevaReserva = res.data || res; // Si devuelve la reserva creada
        // Refrescamos o añadimos
        this._reservas.update(rs => [...rs, { usuario_id: usuarioId, clase_id: claseId }]);
        this._loading.set(false);
      },
      error: (err) => {
        this._error.set('Error al realizar reserva');
        this._loading.set(false);
        console.error(err);
      }
    });
  }
}
