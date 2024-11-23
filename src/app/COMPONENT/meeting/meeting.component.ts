import { Component,ElementRef,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MeetingService } from '../../SERVICE/meeting.service';
import { DialogRef } from '@angular/cdk/dialog';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../SERVICE/auth.service';
import { HasRoleDirective } from '../../hasRole.directive';
import { EmailService } from '../../SERVICE/email.service';

interface MeetingRresult{
  ConductedPerson: String;
  department: String;
  VerticalName: String;
  Mis_Cordinator: String;
  DeptHod: String;
  EMAIL_ID:String
}

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrl: './meeting.component.css'
})
export class MeetingComponent {
  Remark: string[] = [
    'In-Progress',
    'Resolved',
    'Rejected'
  ]

  formSubmitted: any;
  selectedFiles!: FileList;
  meetingId: string = '';
  meetingForm!: FormGroup<any>;
  meetingSearchForm!: FormGroup;

  @ViewChild('empCodeInput') empCodeInput!: ElementRef; // Reference to the input element
  maxWords = 1000;
  showCard = true; // Hide the card on cancel

  
    
  constructor(private _fb: FormBuilder, private meeting: MeetingService, private http: HttpClient, private authService: AuthService,private emailService:EmailService) {
  }
  async ngOnInit(): Promise<void> {
    this.meetingForm = this._fb.group({
      'EMAIL_ID':['',Validators.required],
      'ConductedDate': ['', Validators.required],
      'VerticalName': ['', Validators.required],
      'ConductedPerson': ['', Validators.required],
      'department': ['', Validators.required],
      'DeptHod': ['', Validators.required],
      'EmpCode': ['', Validators.required],
      'ActionPoint': ['', Validators.required],
      'TargetDate': ['', Validators.required],
      'Mis_Cordinator': ['', Validators.required],
      'Remark': ['', Validators.required],
    });
    this.meetingSearchForm = this._fb.group({
      meetingId: ['', Validators.required]
    });
  }
  getTodayString() {
    const today = new Date().toISOString().slice(0, 10);
    return today;
  }
    getWordCount(text: string): number {
    if (!text) return 0;
    return text.trim().split(/\s+/).length;
  }

  isWordLimitExceeded(text: string): boolean {
    return this.getWordCount(text) > this.maxWords;
  }

  onActionPointInput(event: Event) {
    const target = event.target as HTMLTextAreaElement; // Type assertion
    const value = target.value;
    // Trim text to the first 1000 words if needed
    const words = value.trim().split(/\s+/);
    if (words.length > this.maxWords) {
      const truncatedText = words.slice(0, this.maxWords).join(' ');
      this.meetingForm.get('ActionPoint')?.setValue(truncatedText);
    }
  }
  

  onSearchMeetingId() {
    if (this.meetingSearchForm.valid) {
      const meetingId = this.meetingSearchForm.get('meetingId')?.value;
      this.meetingId = meetingId;
      this.meeting.getMeetingDetailsById(meetingId); // Call fetchMeetingDetails with retrieved ID
    }
  }
  onSubmit() {
    if (this.meetingForm.valid) {
      console.log('Data sent to backend:', this.meetingForm.value);
      const meetingData = this.meetingForm.value; // Retrieve form values
       const createdBy = this.authService.getEmpCode(); // Fetch createdBy value from AuthService
      meetingData.CREATED_BY = createdBy; // Add CREATED_BY to meeting data

          
      // Validate ConductedDate and TargetDate before converting to ISO format
      try {
        const ConductedDateString = meetingData.ConductedDate; // Assuming strings here
        const TargetDateString = meetingData.TargetDate;
        const ConductedDate = new Date(ConductedDateString);
        const TargetDate = new Date(TargetDateString);
        if (!ConductedDate.getTime() || !TargetDate.getTime()) {
          throw new Error('Invalid date format. Please enter dates in YYYY-MM-DD format.');
        }
        const year = ConductedDate.getFullYear();
        const month = String(ConductedDate.getMonth() + 1).padStart(2, '0'); // Add leading zero for single-digit months
        const day = String(ConductedDate.getDate()).padStart(2, '0');
        meetingData.ConductedDate = `${year}-${month}-${day}`;
        console.log("inputed Conducted date:", ConductedDate);
        meetingData.TargetDate = year + '-' + month + '-' + String(TargetDate.getDate()).padStart(2, '0');  // Same f
      console.log("Inputed Target date:", meetingData.TargetDate);
    } catch (error) {
      console.error('Error validating dates:');
      // Display error message to the user
      return; // Prevent form submission if dates are invalid
    }
        this.meeting.saveMeetingData(meetingData)
          .subscribe((response) => {
            console.log('Meeting data saved successfully:', response);
            const meetingId = response.meetingId; // Assuming meetingId is in the response
            this.showSuccessNotification(meetingId);
            this.meetingForm.reset();
             this.showCard = false; // Hide the card on cancel


             // Send email request using the service
          this.emailService.getEmail(meetingId, meetingData.EMAIL_ID, meetingData.DeptHod)
            .subscribe((response) => {
              console.log('Email sent response:', response);
              // Optional: Show success message to user about email sending
            }, (error) => {
              console.error('Error sending email:', error);
              // Handle email sending error (e.g., display error message to user)
            });

            // alert("Meeting details added Successfully");
            // this._dialogRef.close();
              
            // Show success message to user (e.g., using a toast notification)
          }, (error) => {
            console.error('Error saving meeting data:', error);
            // Show user-friendly error message (e.g., display in a modal)
              
              
          });
      }
  }
  onCancel() {
    console.log("clicked")
     this.showCard = false; // Hide the card on cancel
  }
  showSuccessNotification(meetingId: string) {
    // Implement your notification logic here (e.g., using a toast library)
    alert(`Meeting saved successfully! Meeting ID: ${meetingId}`);
  }

  async getEmployeeDetails(employeeCode: string) {
    try {
      const response = await this.meeting.getEmployeeDetails(employeeCode).toPromise();
      const employeeData = response; 
      this.meetingForm.patchValue({ DeptHod: employeeData[0], department:employeeData[1], VerticalName:employeeData[2],MisCordinator:employeeData[3],ConductedPerson:employeeData[4],EMAIL_ID:employeeData[5] });
    } catch (error) {
      console.error('Error fetching employee details:', error);
      // Handle error (e.g., display error message to user)
    }
  }

  ngAfterViewInit() {
    if (this.empCodeInput) {
      this.empCodeInput.nativeElement.addEventListener('blur', () => {
        const enteredCode = this.empCodeInput.nativeElement.value;
        this.getEmployeeDetails(enteredCode);
      });
    }
  }

  }

   