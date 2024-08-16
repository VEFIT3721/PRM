import { Component, Inject, Input, OnInit } from '@angular/core';
import { AuthService } from '../../SERVICE/auth.service';
import { MeetingService } from '../../SERVICE/meeting.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

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
  selector: 'app-meeting-details',
  templateUrl: './meeting-details.component.html',
  styleUrl: './meeting-details.component.css'
})
export class MeetingDetailsComponent implements OnInit {

  meetingId: any;
  meetingDetails:MeetingDetails|undefined
  meetingDetailsForm!: FormGroup;
  userRole: string = '';
  meetingSearchForm!: FormGroup;
  originalRemark: string = '';
  finalRemark: string[] = [
    'in-progress',
    'Resolved',
    'Rejected'
  ]
  

  constructor(private router: Router, private _fb: FormBuilder, private meetingService: MeetingService, private authService: AuthService) { }

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
      finalRemark: ['', Validators.required],

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

  // meeting-details.component.ts
  onSubmit() {
    if (this.meetingDetailsForm.valid) {
      console.log('Form is valid');
      const originalRemark = this.originalRemark;
      const updatedRemark = this.meetingDetailsForm.get('finalRemark')?.value;
      const meetingId = this.meetingDetails?.meetingId; // Extract ID from fetched data

      if (!meetingId) {
        console.error('Meeting ID not available');
        return; // Handle missing ID error (optional)
      }

      if (originalRemark !== updatedRemark) {
        // Remark has changed, send entire form data to backend
        this.meetingService.updateMeetingRemark(meetingId, updatedRemark)
          .subscribe(response => {
            // Handle successful update (optional)
            console.log('Remark updated successfully');
            
          }, error => {
            // Handle error during update (optional)
            console.error('Error updating remark:', error);
          });
      } else {
        // Remark hasn't changed (optional: inform user)
        console.log('Remark is unchanged.');
        
      }
    } else {
      console.log('Form is invalid');
    }
  }
  
}
