import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MeetingService } from '../../SERVICE/meeting.service';
import { AuthService } from '../../SERVICE/auth.service';
import { ToastrService } from 'ngx-toastr';


export interface MeetingDetails {
  meetingId: string;
  ConductedDate: string;
  VerticalName: string;
  ConductedPerson: string;
  department: string;
  DeptHod: string;
  EmpCode: string;
  ActionPoint: string;
  TargetDate: string;
  MisCordinator: string;
  Remark: string;
}

@Component({
  selector: 'app-misupdate',
  templateUrl: './misupdate.component.html',
  styleUrl: './misupdate.component.css'
})
export class MISUPDATEComponent implements OnInit {

 meetingId: any;
  meetingDetails:MeetingDetails|undefined
  meetingDetailsForm!: FormGroup;
  userRole: string = '';
  meetingSearchForm!: FormGroup;
  originalRemark: string = '';
   MIS_Status: string[] = [
    'in-progress',
    'Resolved',
    'Rejected'
  ]
 constructor(private router: Router, private _fb: FormBuilder, private meetingService: MeetingService, private authService: AuthService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.userRole = this.authService.getUserRole() || 'unknown';
    if (this.meetingId) {
      this.fetchMeetingDetails();
    }
    this.meetingDetailsForm = this._fb.group({
      meetingId: [''], // Prepopulated, not editable
      ConductedDate: [''], // Prepopulated, not editable
      VerticalName: [''], // Prepopulated, not editable
      ConductedPerson: [''], // Prepopulated, not editable
      department: [''], // Prepopulated, not editable
      DeptHod: [''], // Prepopulated, not editable
      EmpCode: [''], // Prepopulated, not editable
      ActionPoint: [''], // Prepopulated, not editable
      TargetDate: [''], // Prepopulated, not editable
      MisCordinator: [''], // Prepopulated, not editable
      MIS_Status: ['', Validators.required],

    });
    this.meetingSearchForm = this._fb.group({
      meetingId: ['', Validators.required]
    })
  }

  fetchMeetingDetails() {
    this.meetingService.getMeetingDetailsById(this.meetingId)
      .subscribe((response) => {
        if (response) {
          const meetingDetails: MeetingDetails = {
            meetingId: response[0],
            ConductedDate: response[1], // Assuming indices in response match interface properties
            VerticalName: response[2],
            ConductedPerson: response[3],
            department: response[4],
            DeptHod: response[5],
            EmpCode: response[6],
            ActionPoint: response[7],
            TargetDate: response[8],
            MisCordinator: response[9],
            Remark: response[10],
            
          };
          this.meetingDetails = meetingDetails;
          this.originalRemark = meetingDetails.Remark; // Store original remark
        } else {
          console.warn('No meeting details found for ID:', this.meetingId);
          // Handle case where no meeting is found (optional)
        }
      }, (error) => {
        console.error('Error fetching meeting details:', error);
        // Handle error (e.g., display error message to user)
      });
  }
 
  
  onSearchMeetingId() {
    if (this.meetingSearchForm.valid) {
      const meetingId = this.meetingSearchForm.get('meetingId')?.value;
      this.meetingId = meetingId;
      this.fetchMeetingDetails(); // Call fetchMeetingDetails with retrieved ID
      this.meetingDetailsForm.reset();
    }
  }
  
 onSubmit() {
  console.log('Form Values on Submit:', this.meetingDetailsForm.value);
  if (this.meetingDetailsForm.valid) {
    console.log('Form is valid');
    
    const updatedRemark = this.meetingDetailsForm.get('MIS_STATUS')?.value;
    const meetingId = this.meetingDetails?.meetingId; // Extract ID from fetched data
    const updatedBy = String(this.authService.getEmpCode()); 
    const userRemark = this.meetingDetailsForm.get('Remark')?.value; // Get user's remark

    console.log('updated remark:', updatedRemark);
    console.log('userRemark:', userRemark);
    if (!meetingId) {
      console.error('Meeting ID not available');
      return; // Handle missing ID error
    }

    // Check if user's final remark is "Resolved"
    if (updatedRemark === 'Resolved' && userRemark !== 'Resolved') {
      // Show error message if conditions are not met
      this.toastr.error("User final remarks must be 'Resolved' to update MIS_STATUS to 'Resolved'");
      return; // Prevent form submission
    }
    this.meetingDetailsForm.reset()
    // Proceed with updating the MIS remark
    this.meetingService.updateMISRemark(meetingId, updatedRemark, updatedBy,userRemark)
      .subscribe(response => {
        // Handle successful update
        console.log('Remark updated successfully');
        this.toastr.success("Remark updated successfully");
      }, error => {
        // Handle error during update
        console.error('Error updating remark:', error);
      });
    
  } else {
    console.log('Form is invalid');
  }
}

}
