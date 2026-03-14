import { Injectable, signal, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Usuario, LoginRequest, LoginResponse } from '../models/usuario.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  private readonly _usuario = signal<Usuario | null>(this._loadFromStorage());
  private readonly _loading = signal(false);
  private readonly _error = signal<string | null>(null);

  readonly usuario = this._usuario.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();
  readonly rol = computed(() => this._usuario()?.rol ?? null);
  readonly isLoggedIn = computed(() => this._usuario() !== null);

  login(dni: string, password: string): void {
    this._loading.set(true);
    this._error.set(null);

    this.http.post<any>(`${environment.apiUrl}/login`, { dni, password }).subscribe({
      next: (res) => {
        // La API devuelve { status: 'success', user: { ... } }
        const usuario: Usuario = res.user || res.usuario || res;
        this._setUsuario(usuario);
        this._loading.set(false);
        if (usuario.rol === 'coach') {
          this.router.navigate(['/coach/dashboard']);
        } else {
          // Si no ha completado el onboarding o directamente es undefined (false por defecto)
          if (usuario.onboardingCompletado === false || usuario.onboardingCompletado === undefined) {
            this.router.navigate(['/alumno/onboarding']);
          } else {
            this.router.navigate(['/alumno/clase']);
          }
        }
      },
      error: (err) => {
        this._error.set(err.error?.error || 'DNI o contraseña incorrectos');
        this._loading.set(false);
      }
    });
  }

  logout(): void {
    this._usuario.set(null);
    localStorage.removeItem('moviment_user');
    this.router.navigate(['/auth/login']);
  }

  private _setUsuario(usuario: Usuario): void {
    this._usuario.set(usuario);
    localStorage.setItem('moviment_user', JSON.stringify(usuario));
  }

  // Permite actualizar campos de la sesión actual (ej: onboardingCompletado)
  actualizarSesion(cambios: Partial<Usuario>): void {
    const act = this._usuario();
    if (act) {
      this._setUsuario({ ...act, ...cambios });
    }
  }

  private _loadFromStorage(): Usuario | null {
    try {
      const stored = localStorage.getItem('moviment_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }
}
