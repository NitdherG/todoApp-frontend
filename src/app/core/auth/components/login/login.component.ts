import { NgIf, NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { DialogComponent } from '../../../../shared/components/dialog/dialog.component';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    NgOptimizedImage,
    MatProgressSpinnerModule,
    NgIf,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  // se inyecta el router
  private router = inject(Router);
  private authService = inject(AuthService);
  private dialog = inject(MatDialog);

  // se crea el formulario con las validaciones requeridas
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  isLoading: boolean = false;

  onSubmit(): void {
    this.isLoading = true;

    console.warn('this.form', this.loginForm.value);

    const email = this.loginForm.value.email;
    if (!email) {
      return;
    }

    // Validar que exista el usuario
    this.authService.checkUser(email).subscribe({
      next: (data) => {
        // Guarda los datos del usuario en el servicio y en el localStorage
        this.authService.setUserData(data);

        // Redirige a la página de tareas
        this.router.navigate(['/todo']);
      },
      error: (error) => {
        console.warn('error', error);
        this.isLoading = false;

        // Maneja el error si el usuario no existe
        if (error.status === 404) {
          this.openDialog(error.error.error);
        }
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  openDialog(message: string): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { message: message },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const email = this.loginForm.value.email;
        if (!email) {
          return;
        }

        const newUser = {
          id: '',
          email: email,
          createdAt: new Date(),
        };
        this.authService.createUser(newUser).subscribe({
          next: (data) => {
            this.authService.setUserData(data.user);
            this.router.navigate(['/todo']);
          },
          error: (error) => {
            console.warn('error', error);
          },
        });
      }
    });
  }

  get email() {
    return this.loginForm.get('email');
  }
}
