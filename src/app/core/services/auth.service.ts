import { Injectable, signal, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Usuario, LoginRequest, LoginResponse } from '../models/usuario.model';

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

    // TODO: reemplazar mock por POST /auth/login cuando el backend lo tenga
    this._mockLogin(dni, password);
  }

  logout(): void {
    this._usuario.set(null);
    localStorage.removeItem('moviment_user');
    this.router.navigate(['/login']);
  }

  private _mockLogin(dni: string, _password: string): void {
    // Mock temporal hasta que el backend tenga endpoint de auth
    setTimeout(() => {
      if (dni.toUpperCase() === 'COACH00A') {
        const usuario: Usuario = { id: '1', nombre: 'Admin Coach', dni: 'COACH00A', rol: 'coach' };
        this._setUsuario(usuario);
        this.router.navigate(['/coach/dashboard']);
      } else if (dni.toUpperCase() === 'ALUMNO0B') {
        const usuario: Usuario = { id: '2', nombre: 'María García', dni: 'ALUMNO0B', rol: 'alumno', grupo: 'Adultos mañanas' };
        this._setUsuario(usuario);
        this.router.navigate(['/alumno/clase']);
      } else {
        this._error.set('DNI o contraseña incorrectos');
      }
      this._loading.set(false);
    }, 600);
  }

  private _setUsuario(usuario: Usuario): void {
    this._usuario.set(usuario);
    localStorage.setItem('moviment_user', JSON.stringify(usuario));
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
