# Backend API — Contexto para el Agente Angular

## URL Base

| Entorno | URL |
|---------|-----|
| Local | `http://localhost:8787` |
| Producción | *(pendiente de deploy en Cloudflare)* |

---

## CORS

El backend ya tiene CORS configurado. Angular puede hacer peticiones directamente sin proxy:
- `Access-Control-Allow-Origin: *`
- Métodos: `GET, POST, OPTIONS`
- Preflight `OPTIONS` respondido automáticamente

---

## Endpoints Disponibles

### `GET /`
Devuelve la lista completa de alumnos.

**Response:**
```json
{
  "status": "success",
  "mensaje": "¡Backend de MOVIMENT conectado y sin CORS!",
  "alumnosEnBaseDeDatos": 2,
  "data": [
    {
      "id": "uuid",
      "short_id": "#A001",
      "nombre": "Juan García",
      "dni": "12345678A",
      "anio_nacimiento": 1990,
      "grupo": "Adultos mañanas",
      "med_paper": false,
      "consent_paper": true,
      "created_at": "2026-03-11T22:00:00Z"
    }
  ]
}
```

---

## Modelos de Datos (TypeScript sugerido para Angular)

```ts
export interface Alumno {
  id: string;           // UUID
  short_id: string;     // Ej: "#A001"
  nombre: string;
  dni: string;
  anio_nacimiento: number | null;
  grupo: string;        // "Adultos mañanas", etc.
  med_paper: boolean;
  consent_paper: boolean;
  created_at: string;   // ISO timestamp
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
- *(se pueden añadir más)*

---

## Stack del Backend (solo como referencia)
- **Cloudflare Workers** — runtime serverless edge
- **Neon** — PostgreSQL serverless
- **Drizzle ORM** — query builder tipado
- **Repo:** https://github.com/HugoCatl/gym-backend
