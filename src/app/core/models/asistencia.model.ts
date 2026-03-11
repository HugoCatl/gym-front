export interface Asistencia {
  id: number;
  alumno_id: string;    // UUID → Alumno
  fecha: string;        // "2026-03-11"
  hora: string;         // "22:00:00"
  metodo: 'qr' | 'button';
}

export interface AsistenciasApiResponse {
  status: string;
  data: Asistencia[];
}
