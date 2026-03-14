export type UserRole = 'coach' | 'alumno';

export interface Usuario {
  id: string;
  nombre: string;
  dni: string;
  rol: UserRole;
  grupo?: string; // solo para alumnos
  sexo?: string;
  edad?: number;
  telefono?: string;
  consentimientoDatos?: boolean;
  consentimientoFotos?: boolean;
  consentimientoRiesgos?: boolean;
  onboardingCompletado?: boolean;
}

export interface LoginRequest {
  dni: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  usuario: Usuario;
}
