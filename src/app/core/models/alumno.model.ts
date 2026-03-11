export interface Alumno {
  id: string;            // UUID
  short_id: string;      // Ej: "#A001"
  nombre: string;
  dni: string;
  anio_nacimiento: number | null;
  grupo: string;         // "Adultos mañanas", "Adultos tardes", etc.
  med_paper: boolean;
  consent_paper: boolean;
  created_at: string;    // ISO timestamp
}

export interface AlumnosApiResponse {
  status: string;
  mensaje: string;
  alumnosEnBaseDeDatos: number;
  data: Alumno[];
}
