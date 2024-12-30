import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MeetingService } from '../../SERVICE/meeting.service';

@Component({
  selector: 'app-usermaster',
  templateUrl: './usermaster.component.html',
  styleUrl: './usermaster.component.css'
})
export class UsermasterComponent {
  UserCreationForm!: FormGroup<any>;

  DEPARTMENT: string[] = [
    'CRM',
    'MIS',
    'HEAD',
    'VIGILANCE ',
    'OPERATION OVERSIGHT',
    'LEGAL',
    'INSURANCE',
    'RISK',
    'RELATIONSHIP MANAGEMENT',
    'VIGILANCE',
    'SALES',
    'HR',
    'TRAINING ',
    'SALES - CE',
    'PRODUCT AND STRATEGY',
    'CREDIT',
    'PRODUCT HEAD',
    'HR ',
    'CREDIT ',
    'OPERATION',
    'REPO SALE',
    'RISK HEAD ',
    'SALES - CV',
    'IT',
    'MARKETING',
    'LEGAL HEAD',
    'VEF',
    'CSD',
    ' COLLECTION ',
    'BUSINESS HEAD',
    'COLLECTION',
    'CREDIT HEAD',
    'LEGAL COLLECTION',
    'AUDIT',
    'REPO',
    'ADALAT HEAD',

  ];
  CONDUCTEDPERSON: string[] = ['HEMANTH PATIL',
    'AJAY BHALCHANDRA SHELKE',
    'DIGBIJAY BANDYOPADHYAY',
    'SATHYANARAYAN K RAO',
  ];
  MISCORDINATOR: string[] = ['GAYATHRY K',
    'DEVIKA V P',
    'PAVITHRA N V',
    'SUKANYA N P',
  ];

  VERTICALNAME: string[] = ['COMMERCIAL VEHICLE FINANCE',
    'CAR LOAN DEPARTMENT',
    'FARM EQUIPMENT DEPARTMENT',
    'TWO WHEELER FINANCE-TWF',
  ]
  
  constructor(private fb: FormBuilder, private user: MeetingService) {
    this.UserCreationForm = this.fb.group({
      'DEPARTMENT': ['', Validators.required],
      'MISCORDINATOR': ['', Validators.required],
      'CONDUCTEDPERSON': ['', Validators.required],
      'EMAIL_ID': ['', Validators.required],
      'MIS_EMAIL': ['', Validators.required],
      'VERTICALNAME': ['', Validators.required],
      'DEPTHOD': ['', Validators.required],
      'EMP_CODE': ['', Validators.required],

    });
  }
  onSubmit(): void {
    if (this.UserCreationForm.valid) {
      console.log('data send to backend', this.UserCreationForm.value);
      const userData = this.UserCreationForm.value

      this.user.userData(userData).subscribe(data => {
        console.log('user saved', data);
        alert("User saved Successfully");
        this.UserCreationForm.reset()

      },(error => {
        console.log('error while saving user data', error);
      }));
        
      
    }
  }

}
