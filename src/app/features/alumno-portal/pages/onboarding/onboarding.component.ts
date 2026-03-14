import { Component, inject, ChangeDetectionStrategy, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-onboarding',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './onboarding.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OnboardingComponent {
  private readonly fb = inject(FormBuilder);
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  readonly auth = inject(AuthService);

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  readonly form = this.fb.group({
    sexo: [''],
    edad: [null as number | null, [Validators.min(14), Validators.max(100)]],
    telefono: [''],
    consentimientoDatos: [false],
    consentimientoFotos: [false],
    consentimientoRiesgos: [false, Validators.requiredTrue] // Este podría ser obligatorio
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    
    this.guardarOnboarding(this.form.getRawValue());
  }

  omitir(): void {
    // Si lo omite, marcamos onboarding completado pero sin más datos
    this.guardarOnboarding({});
  }

  private guardarOnboarding(data: any): void {
    const user = this.auth.usuario();
    if (!user) return;

    this.loading.set(true);
    this.error.set(null);

    const payload = {
      ...data,
      onboardingCompletado: true
    };

    this.http.put(`${environment.apiUrl}/usuarios/${user.id}`, payload).subscribe({
      next: () => {
        // Actualizamos la sesión local
        this.auth.actualizarSesion({
          ...data,
          onboardingCompletado: true
        });
        
        // Redirigimos a la app principal
        this.router.navigate(['/alumno/clase']);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error guardando onboarding', err);
        this.error.set('No se pudo guardar el perfil. Inténtalo de nuevo.');
        this.loading.set(false);
      }
    });
  }
}
