import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../SERVICE/auth.service';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { error } from 'console';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrl: './user-registration.component.css'
})
export class UserRegistrationComponent implements OnInit {
 
  regForm!: FormGroup;
  errorMessage: string = '';
  user_roles = ['USER','ADMIN', 'CHECKER']; 
  constructor(private fb:FormBuilder,private registerService:AuthService,private router:Router,private toaster:ToastrService){}
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
     const meetingData = this.regForm.value
     const createdBy = this.registerService.getEmpCode(); // Fetch createdBy value from AuthService
      meetingData.CREATED_BY = createdBy; 
      this.registerService.registerUser(this.regForm.value).subscribe((response) => {
        this.toaster.success('User Created Sucessfully');
        this.router.navigate(['/login'])

        this.regForm.reset();
        
  });
      
    } else{
       this.errorMessage= "Please fill all the fields";
       this.toaster.error("kindly fill correct details")
    }

  
}

}
