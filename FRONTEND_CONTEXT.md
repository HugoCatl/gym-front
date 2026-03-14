# Backend API — Contexto para el Agente Angular

## URL Base

| Entorno | URL |
|---------|-----|
| Local | `http://127.0.0.1:8787/api` |
| Producción | *(pendiente de deploy en Cloudflare)* |

---

## CORS

El backend ya tiene CORS configurado. Angular puede hacer peticiones directamente sin proxy:
- `Access-Control-Allow-Origin: *`
- Métodos: `GET, POST, PUT, OPTIONS`
- Preflight `OPTIONS` respondido automáticamente

---

## Endpoints Disponibles

### 1. 🔐 Autenticación
**`POST /api/login`**
- **Body:** `{ "dni": "12345678A", "password": "tu_password" }`
- **Uso:** Para que el front inicie sesión. Devuelve los datos básicos del usuario y su rol (`alumno` o `coach`) si las credenciales coinciden.

### 2. 👥 Gestión de Usuarios (Alumnos y Coach)
**`GET /api/usuarios`**
- **Uso:** Devuelve la lista estructurada de todos los alumnos que el Coach ve en su dashboard, incluyendo el estado de sus papeles médicos y de consentimiento.

**`POST /api/usuarios`**
- **Body:** `{ "nombre": "...", "dni": "...", "rol": "alumno" }`
- **Uso:** Para dar de alta a nuevos alumnos desde el panel del Coach.

**`PUT /api/usuarios/:id`**
- **Body:** `{ "med_paper": true, "consent_paper": false }`
- **Uso:** Modificar los datos de un usuario en concreto (ideal para marcar que han traído la documentación).

### 3. 📅 Gestión de Clases
**`GET /api/clases`**
- **Uso:** Devuelve la lista de clases que van a mostrarse en los horarios.

**`POST /api/clases`**
- **Body:** `{ "titulo": "Movilidad", "fecha": "2026-03-15", "horario": "10:00 - 11:00", "color": "#22c55e" }`
- **Uso:** Panel del coach para añadir sesiones al calendario.

### 4. ✅ Reservas de Clases (Student Portal)
**`GET /api/reservas?usuarioId=UUID`**
- **Uso:** Devuelve las clases a las que se ha apuntado un alumno en específico para marcarlas en su PWA (o sin parámetro para ver todas).

**`POST /api/reservas`**
- **Body:** `{ "usuarioId": "uuid-del-alumno", "claseId": 1 }`
- **Uso:** Cuando el alumno toca el botón verde de "¡Me apunto!".

---

## Modelos de Datos (TypeScript sugerido para Angular)

```ts
export type UserRole = 'coach' | 'alumno';

export interface Usuario {
  id: string;
  nombre: string;
  dni: string;
  rol: UserRole;
  grupo?: string; // solo para alumnos
}

export interface Alumno extends Usuario {
  short_id: string;     // Ej: "#A001"
  anio_nacimiento?: number | null;
  med_paper?: boolean;
  consent_paper?: boolean;
  created_at?: string;   // ISO timestamp
}

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
  usuario_id: string;
  clase_id: number | string;
}

export interface Asistencia {
  id: number;
  alumno_id: string;    // UUID → Alumno
  fecha: string;        // "2026-03-11"
  hora: string;         // "22:00:00"
  metodo: 'qr' | 'button';
}
```

---

## Grupos Existentes (datos de referencia)
Los grupos son texto libre en la DB. Valores esperados:
- `"Adultos mañanas"`
- `"Adultos tardes"`
- `"Mujeres tarde"`
- *(se pueden añadir más)*

---

## Stack del Backend (solo como referencia)
- **Cloudflare Workers** — runtime serverless edge
- **Neon** — PostgreSQL serverless
- **Drizzle ORM** — query builder tipado
- **Repo:** https://github.com/HugoCatl/gym-backend
