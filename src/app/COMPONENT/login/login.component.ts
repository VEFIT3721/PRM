import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../SERVICE/auth.service';
import { Router } from '@angular/router';

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
    private login: AuthService
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
          console.log('Login Successful:', response);
          if (response.token) {
            localStorage.setItem('authToken', response.token);
            this.router.navigate(['/dashboard']);
            this.login.startTimeoutTimer().subscribe(); // Start session timeout timer
          } else {
            console.error('Missing token in response');
            this.errorMessage = 'An error occurred during login.';
          }
        },
        (error: any) => {
          console.error('Login Error:', error);
          this.errorMessage = this.handleLoginError(error);
        }
      );
    } else {
      console.log('Login failed');
      this.errorMessage = 'Please check your credentials.';
    }
  }

  private handleLoginError(error: any): string {
    if (error.status === 401) {
      return 'Invalid username or password.';
    } else {
      return 'An error occurred while logging in. Please try again later.';
    }
  }
  }

