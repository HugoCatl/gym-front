# Instrucciones de Desarrollo Frontend (MOVIMENT)

## 1. Comandos Principales

- **Arrancar entorno de desarrollo:** `npm start` (o `ng serve`). Abrirá el proyecto en http://localhost:4200/ e inyectará los cambios en vivo.
> **⚠️ IMPORTANTE:** Si instalas dependencias fuertes como Tailwind o cambias la configuración `tailwind.config.js`, debes DENTENER el servidor (`Ctrl + C`) y volver a arrancar con `npm start` para que recargue el compilador CSS.
- **Compilar para producción:** `npm run build`. Generará los archivos finales (estáticos HTML/JS/CSS) en la carpeta `dist/gym-front` listos para desplegar en tu Cloudflare Worker.

## 2. Usuarios de Prueba (Mock Login)

Actualmente la app tiene un **Mock System** temporal habilitado en `AuthService` para facilitar el maquetado visual sin depender del backend:
- **Vista Coach Panel:** DNI: `COACH00A` (Password: da igual) -> Redirige a `/coach/dashboard`
- **Vista Portal Alumno:** DNI: `ALUMNO0B` (Password: da igual) -> Redirige al PWA en `/alumno/clase`

## 3. Consideraciones de Desarrollo (Angular 21)
- **Zoneless Setup:** La app funciona con `provideZonelessChangeDetection()`. Esto elimina Zone.js y mejora muchísimo el rendimiento, pero significa que Angular *sólo* actualiza la pantalla si cambias un **Signal** (`signal`, `computed`). Debes usar `changeDetection: ChangeDetectionStrategy.OnPush` en todo componente nuevo.
- **Inputs Modernos:** Se utiliza la nueva API reactiva `input.required<T>()` en los componentes.

## 4. Estilos, Tailwind v3 y CSS Premium
- **Archivo Base:** Toda configuración CSS manual está en `src/styles.scss`. Aquí encontrarás componentes globales marcados con el `@layer components` de Tailwind.
- **Arquitectura de Variables:** 
  - La paleta principal `stone` viene heredada del framework.
  - La variable `oliva` (#6b705c) y los colores `.grupo-manana/tarde` están definidos a la carta en `tailwind.config.js`.
- **UI Premium (Estilo Apple Fitness):** En `styles.scss` incluimos keyframes puros para las animaciones:
  - Clase `.btn-gradient-oliva`: Da un sombreado glow 3D al botón principal y tiene un keyframe de "brillo" animado constante (`shine`).
  - Clase `.btn-success`: Incluye un `bounce` de confirmación (`successPop`) al matricularse.
  - Se utiliza masivamente propiedades visuales como sombras fuertes y Drop-Shadows suavizadas para aportar volumen a tarjetas.

## 5. Próxima Fase: Conexión con Backend (Hono)
Cuando pases a producción en tu BBDD Neo con Drizzle:
1. Revisa `src/environments/environment.ts` para que la Interceptor Tool apunte a la ruta correcta de tu Hono Worker (ej. `http://localhost:8787`).
2. Edita las funciones `login()` en `AuthService` para hacer el `POST /login` y borrar los if lógicos del mock.
3. Enlazar las funciones de botones finales: 
   - `apuntarse()` (POST /asistencias) en Alumno.
   - `toggleDoc()` (PUT /alumnos/:id) en tarjeta Coach de documentación.
