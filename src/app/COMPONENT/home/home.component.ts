import { Component, OnInit } from '@angular/core';
import { MeetingService } from '../../SERVICE/meeting.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MeetingComponent } from '../meeting/meeting.component';
import { AuthService } from '../../SERVICE/auth.service';
import { Router } from '@angular/router';
import { MeetingDetailsComponent } from '../meeting-details/meeting-details.component';
interface MeetingData {
  ID: number;
  ConductedDate: string;
  vertical : Date;
  conductedPerson: number;
  department: string;
  HODNAME: string;
  HODEMPCODE : string;
  ActionPoint: string;
  TargetDate: string;
  MisCordinator: number;
  Status:string
  
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  host: { ngSkipHydration: 'true' }
})
export class HomeComponent implements OnInit {
  meetings: MeetingData[] = [];
  apiUrl = 'http://localhost:3000/api/export-meetings'; 
  displayColumns: string[] = [
    'id',
    'Name',
    'state',
    'day',
    'Attendees',
    'performerName',
    'TeamSize',
    'department',
    'Product_Name',
    'meetingsubject',
    'Status',
    'emp_code',
    'designation'
  ];
  fromDate: any;
  toDate: any;

  constructor( private meetingService: MeetingService, private http: HttpClient, private authService:AuthService,private router:Router) {}
  
  ngOnInit(): void {
    // this.meetingService.getProducts().subscribe(data => {
    //   this.meetings = data;
     
    // });
  }
  getData() {
    this.http.get<MeetingData[]>(this.apiUrl)
      .subscribe(data => {
        this.meetings = data;
      });
  }

  openEditForm() {
    //   const dialog = this._dialog.open(MeetingComponent);

    //   dialog.afterClosed().subscribe((result: MeetingData | undefined) => {
    //     if (result) {
    //       this.handleFormData(result);
    //     }
    //   });
    // }

    // handleFormData(formData: MeetingData) {
    //   // Update your backend service or local data with the submitted meeting data
    //   this.getData(); // Refresh the table data after updating
    // }
    this.router.navigate(['/meeting'])
  }
  UpdateForm() {
    this.router.navigate(['/edit']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
    
  }
  open() {
    this.router.navigate(['/export']);
  }
  exportToExcel() {
        this.http.get(this.apiUrl, { responseType: 'blob' })
      .subscribe(blob => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'meeting_data.xlsx';
        link.click();
      });
  }
  Export() {
    this.router.navigate(['/export']);
  }
}

