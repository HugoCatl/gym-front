import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  private readonly fb = inject(FormBuilder);
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  readonly auth = inject(AuthService);

  readonly form = this.fb.nonNullable.group({
    nombre: ['', [Validators.required]],
    dni: ['', [Validators.required, Validators.minLength(8)]],
    password: ['', [Validators.required, Validators.minLength(4)]]
  });

  submit(): void {
    if (this.form.invalid) return;
    const data = this.form.getRawValue();
    const body = {
      nombre: data.nombre,
      dni: data.dni,
      password: data.password,
      rol: 'alumno'
    };

    this.http.post<any>(`${environment.apiUrl}/usuarios`, body).subscribe({
      next: () => {
        // Después de registrar, hacemos login
        this.auth.login(data.dni, data.password);
      },
      error: (err) => {
        console.error('Error al registrar usuario', err);
        alert('Hubo un error al registrar el usuario.');
      }
    });
  }
}
