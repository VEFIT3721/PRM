import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../SERVICE/auth.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrl: './user-registration.component.css'
})
export class UserRegistrationComponent implements OnInit {
 
  regForm!: FormGroup;
  errorMessage: string = '';
  roles = ['MIS','User', 'Admin']; 
  constructor(private fb:FormBuilder,private registerService:AuthService){}
  ngOnInit(): void {
    this.regForm = this.fb.group({
      EmpCode: ['', Validators.required],
      username:['',Validators.required],
      useremail:['',Validators.compose([Validators.required,Validators.pattern(/^.*@manappuram\.com$/)])],
      password:['',Validators.compose([Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/)])],
      roles:['',Validators.required],
    });
  }
  onSubmit(): void {

    if (this.regForm.valid) {
      console.log('user created sucessfully',this.regForm.value);
      this.registerService.registerUser(this.regForm.value).subscribe((response) => {
        alert('User Created Sucessfully');
        //console.log("Response", response);
        this.regForm.reset();
  });
      
    } else{
      console.error('Login form validation errors:', this.regForm.errors);
      this.errorMessage= "Please fill all the fields";
    }

  
}

}
