import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [],
  template: `
    <div class="p-6 md:p-10">
      <p class="section-label">Historial</p>
      <h1 class="text-3xl font-black italic uppercase text-stone-900 tracking-tight mb-8">Asistencias</h1>
      <div class="card p-12 text-center">
        <p class="text-stone-300 text-6xl mb-4">📅</p>
        <p class="text-stone-400 font-bold text-sm uppercase tracking-widest">
          Próximamente — Vista de calendario mensual
        </p>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistorialComponent {}
