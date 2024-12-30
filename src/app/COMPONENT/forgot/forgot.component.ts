import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../SERVICE/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrl: './forgot.component.css'
})
export class ForgotComponent {
  forgotPasswordForm: FormGroup;

  constructor(private fb: FormBuilder, private authService:AuthService, private router: Router) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit(): void {
    if (this.forgotPasswordForm.valid) {
      const email = this.forgotPasswordForm.value.email;
      this.authService.requestPasswordReset(email).subscribe(
        response => {
          alert('A password reset link has been sent to your email.');
          this.router.navigate(['/login']);
        },
        error => {
          alert('Error: Could not send reset link. Please try again.');
        }
      );
    }
  }
}
