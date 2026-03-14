import { Component, inject, signal, computed, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { ClasesService, Clase } from '../../../../core/services/clases.service';

@Component({
  selector: 'app-proxima-clase',
  standalone: true,
  imports: [],
  templateUrl: './proxima-clase.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProximaClaseComponent implements OnInit {
  readonly auth = inject(AuthService);
  readonly clasesSvc = inject(ClasesService);

  readonly proximaClase = computed<Clase | null>(() => {
    const clases = this.clasesSvc.clases();
    if (clases.length === 0) return null;
    return clases[0];
  });

  readonly apuntado = computed(() => {
    const pc = this.proximaClase();
    if (!pc || !pc.id) return false;
    const reservas = this.clasesSvc.reservas();
    return reservas.some(r => String(r.clase_id) === String(pc.id));
  });

  ngOnInit() {
    this.clasesSvc.cargarClases();
    const ui = this.auth.usuario()?.id;
    if (ui) {
      this.clasesSvc.cargarReservas(ui);
    }
  }

  apuntarse(): void {
    if (this.apuntado()) return;
    const pc = this.proximaClase();
    const ui = this.auth.usuario()?.id;
    if (pc && pc.id && ui) {
      this.clasesSvc.reservarClase(ui, pc.id);
    }
  }
}
