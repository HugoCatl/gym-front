export type UserRole = 'coach' | 'alumno';

export interface Usuario {
  id: string;
  nombre: string;
  dni: string;
  rol: UserRole;
  grupo?: string; // solo para alumnos
}

export interface LoginRequest {
  dni: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  usuario: Usuario;
}
