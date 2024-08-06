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
  constructor(private fb:FormBuilder,private router:Router,private login:AuthService){}
  ngOnInit(): void {
    this.loginform = this.fb.group({
      'username':['',Validators.required],
  'password':['',Validators.compose([Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/)])]
    });
  }
  onSubmit(): void {
    if (this.loginform.valid) {
      const username = this.loginform.value.username;
      const password = this.loginform.value.password;
      const loginData = { username, password };
       // Call the login method from your service
      this.login.login(loginData).subscribe((response:any) => {
        console.log('Login Sucessful:',response);
      this.router.navigate(['/home']);
      alert('sucessfully login')
      },(error:any) => {
        //handle login error
        alert('username or password incorrect')
        console.error('Login Error:',error);
      this.loginform.reset();
        this.errorMessage = this.handleLoginError(error); // Handle errors more informatively
      }
      );
    }else {
      console.log('Login failed');
      this.errorMessage = 'Please check your credentials'; // More specific error message
    }
  }private handleLoginError(error: any): string {
    if (error.status === 401) {
      if (error.error.message === 'user not found') {
        return 'User not registered. Please login first.';
      } else {
        return 'Invalid username or password.';
      }
    } else {
      return 'An error occurred while logging in. Please try again later.';
    }
  }
  }

