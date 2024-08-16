import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../SERVICE/auth.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrl: './user-registration.component.css'
})
export class UserRegistrationComponent implements OnInit {
 
  regForm!: FormGroup;
  errorMessage: string = '';
  user_roles = ['maker','checker', 'Admin']; 
  constructor(private fb:FormBuilder,private registerService:AuthService,private router:Router){}
  ngOnInit(): void {
    this.regForm = this.fb.group({
      EmpCode: ['', Validators.required],
      username:['',Validators.required],
      useremail:['',Validators.compose([Validators.required,Validators.pattern(/^.*@manappuram\.com$/)])],
      hashedPassword:['',Validators.compose([Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/)])],
      user_roles:['',Validators.required],
    });
  }
  onSubmit(): void {

    if (this.regForm.valid) {
      console.log('user created sucessfully',this.regForm.value);
      this.registerService.registerUser(this.regForm.value).subscribe((response) => {
        alert('User Created Sucessfully');
        this.router.navigate(['/login'])
        //console.log("Response", response);
        this.regForm.reset();
  });
      
    } else{
      console.error('Login form validation errors:', this.regForm.errors);
      this.errorMessage= "Please fill all the fields";
    }

  
}

}
