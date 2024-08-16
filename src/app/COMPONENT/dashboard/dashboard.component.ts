import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DashboardService } from '../../SERVICE/dashboard.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DASHBOARDComponent  implements OnInit {
  searchForm: FormGroup;
  atrDetails: any[] = [];
  displayedColumns: string[] = ['verticalName','Empcode','DELAY_DAYS']; // Add more columns as needed
  loading = false;

  constructor(private fb: FormBuilder, private atrService: DashboardService, private snackBar: MatSnackBar) {
    this.searchForm = this.fb.group({
      searchTerm: ['']
    });
  }

  ngOnInit(): void {}

  onSearch(): void {
    const searchTerm = this.searchForm.get('searchTerm')?.value;

    if (!searchTerm) {
      this.snackBar.open('Please enter a department or employee code', 'Close', {
        duration: 3000
      });
      return;
    }

    this.loading = true;
    this.atrService.getPendingATRDetails(searchTerm).subscribe(
      (data: any[]) => {
        this.atrDetails = data.map(row => ({
          Empcode: row[1],
           DELAY_DAYS: row[2],
          verticalName: row[0],
          
        }));
        this.loading = false;
      },
      (_error: any) => {
        this.snackBar.open('Error fetching data', 'Close', {
          duration: 3000
        });
        this.loading = false;
      }
    );
  }

}

