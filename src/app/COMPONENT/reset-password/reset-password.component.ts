import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../SERVICE/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  token!: string;
  

  constructor(
    private fb: FormBuilder, 
    private route: ActivatedRoute, 
    private authService: AuthService, 
    private router: Router
  ) {
    // Initialize the form with custom password validator
    this.resetPasswordForm = this.fb.group({
      empCode: ['', Validators.required], 
      password: ['', [
        Validators.required, 
        Validators.minLength(8), 
        this.passwordStrengthValidator
      ]],
      confirmPassword: ['', [Validators.required]],
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    // Get the token from the URL
    this.token = this.route.snapshot.queryParamMap.get('token')!;
  }

  // Custom password strength validator
  passwordStrengthValidator(control: any) {
    const password = control.value;
    const minLength = /^(?=.{8,})/; // At least 8 characters
    const lowercase = /[a-z]/;      // At least one lowercase letter
    const uppercase = /[A-Z]/;      // At least one uppercase letter
    const specialChar = /[!@#$%^&*(),.?":{}|<>]/; // At least one special character

    if (!minLength.test(password)) {
      return { minLength: true };
    }
    if (!lowercase.test(password)) {
      return { lowercase: true };
    }
    if (!uppercase.test(password)) {
      return { uppercase: true };
    }
    if (!specialChar.test(password)) {
      return { specialChar: true };
    }
    return null; // Valid password
  }

  // Custom validator to ensure password and confirmPassword match
  passwordMatchValidator(control: FormGroup) {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }

    return null;
  }

  onSubmit(): void {
    if (this.resetPasswordForm.valid) {
      const newPassword = this.resetPasswordForm.value.password;
      const Changed_By = this.resetPasswordForm.value.empCode;

      // Call the AuthService to reset the password using the token
      this.authService.resetPassword(this.token, newPassword, Changed_By).subscribe(
        (response) => {
          console.log(response);
          alert('Your password has been reset successfully.');
          this.router.navigate(['/login']);
        },
        (error) => {
          if (error.error.message === "New password cannot be the same as the old password") {
            alert("Your new password cannot be the same as the old password.");
          } else {
            alert('Error: Could not reset your password. Please try again.');
          }
        }
      );
    }
  }

  // Utility function to check if a field is invalid and touched
  isFieldInvalid(field: string): boolean {
    const control = this.resetPasswordForm.get(field);
    return control ? control.invalid && (control.touched || control.dirty) : false;
  }
  

}
