import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../SERVICE/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginform!: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private login: AuthService,
    private toastr:ToastrService
  ) {}

  ngOnInit(): void {
    this.loginform = this.fb.group({
      username: ['', Validators.required],
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&^]{8,15}$/)
        ])
      ]
    });
  }

  onSubmit(): void {
    if (this.loginform.valid) {
      const EmpCode = this.loginform.value.username;
      const password = this.loginform.value.password;
      const loginData = { EmpCode, password };

      this.login.login(loginData).subscribe(
        (response: any) => {
          this.loginform.reset();

          if (response.token) {
            localStorage.setItem('authToken', response.token);
            this.router.navigate(['/dashboard']);
            this.login.startTimeoutTimer().subscribe(); // Start session timeout timer
            this.toastr.success('Login Successful!', 'Success');
            
          } else {
            console.error('Missing token in response');
            this.toastr.error('Invalid Credentials!', 'Error');
            this.errorMessage = 'An error occurred during login.';
          }
        },
        (error: any) => {
          console.error('Login Error:', error);
          this.errorMessage = this.handleLoginError(error);
          this.toastr.error('Invalid user name or password','error');
          this.resetForm();
        }
      );
    } else {
      alert('Login failed');
      this.errorMessage = 'Please check your credentials.';
      this.toastr.error("Please check your credentials");
      this.toastr.error(this.errorMessage, 'Error');
      this.resetForm();
    }
  }

  private handleLoginError(error: any): string {
    if (error.status === 401) {
      return 'Invalid username or password.';
    } else {
      return 'An error occurred while logging in. Please try again later.';
    }
  }
  private resetForm(): void {
    this.loginform.reset();
    this.errorMessage = ''; // Clear error message
    // Optionally, you can reapply validation errors if necessary
    this.loginform.markAsPristine();
    this.loginform.markAsUntouched();
  }
  }

