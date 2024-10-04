import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import moment from 'moment';
import { MomentTimezone } from 'moment-timezone';
import * as XLSX from 'xlsx';
import { ReloadService } from '../../SERVICE/reload.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  Status: string;
}
@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrl: './export.component.css'
})
export class ExportComponent {
  Export!: FormGroup<any>;
  MeetingData!: MeetingData[];
  apiUrl = 'https://vef.manappuram.com/api/export-excel';
  errorMessage: string = '';
  exportLimit = 10000;
  toDateError = false; // Flag for end date validation
  

  
  
  
  constructor(private http: HttpClient, private fb: FormBuilder, private pageReloadService: ReloadService, private snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.Export = this.fb.group({
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
    })
  }
 


  reloadPage() {

    this.pageReloadService.reloadCurrentPage();

  }

  async exportToExcel() {
    // const fromDate = this.Export.get('fromDate')?.value;
    // const toDate = this.Export.get('toDate')?.value;
    if (this.Export.valid) {
      console.log("data send to backend", this.Export.value)
      const ExportData = this.Export.value;
      // validate the dates before converting to ISO format
      try {
         
        const fromDateString = ExportData.fromDate;
        const toDateString = ExportData.toDate;
        const fromDate = new Date(fromDateString);
        const toDate = new Date(toDateString)
        const year = fromDate.getFullYear();
        const month = String(fromDate.getMonth() + 1).padStart(2, '0');
        const day = String(fromDate.getDate()).padStart(2, '0');
        ExportData.fromDate = `${year}-${month}-${day}`;
        console.log("inputed date:", fromDate);
        // ExportData.toDate = year + '-' + month + '-' + String(toDate.getDate()).padStart(2, '0')
        ExportData.toDate =`${year}-${String(toDate.getMonth() + 1).padStart(2, '0')}-${String(toDate.getDate()).padStart(2, '0')}`
        if (toDate.getTime() < fromDate.getTime()) {
          throw new Error('Invalid date format. Please enter dates in YYYY-MM-DD format.');
        }
      } catch (error) {
        console.error('Error validating dates:');
        alert("to date should not less than from date")
        return;
      }
    // passed fromDate and Todate through query params
      const queryParams = `fromDate=${ExportData.fromDate}&toDate=${ExportData.toDate}`;
    
      this.http.get(this.apiUrl + '?' + queryParams, { responseType: 'blob' })
        .subscribe(blob => {
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'prm_data.xlsx';
          link.click();
            // Show success notification
            this.snackBar.open('Export successful!', 'Close', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
            });
            this.Export.reset();
        }, error => {
          console.error(error);
          if (error.status === 400 && error.error.message.includes('export limit')) {
            this.snackBar.open(`Maximum export limit is ${this.exportLimit}. Please refine your date range.`, 'Close', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
              panelClass: ['error-snackbar']
            });
          } else {
            // Handle other errors (e.g., database connection, invalid data format)
            this.errorMessage = 'Failed to export data. Please try again later.';
          }
        });
    }

  }
}

