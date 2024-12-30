import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DashboardService } from '../../SERVICE/dashboard.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DASHBOARDComponent  implements OnInit {
  atrDetails: MatTableDataSource<any> = new MatTableDataSource();  // Use MatTableDataSource
  displayedColumns: string[] = ['USER_NAME', 'DEPARTMENT', 'Inprogress', 'TOTAL_DELAYS', 'DELAY_DAYS']; // Define the columns
  loading = false;

  constructor(private http: HttpClient) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.fetchDelaysData();  // Fetch data from backend
  }

  // Apply filter to the table
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.atrDetails.filter = filterValue.trim().toLowerCase();

    if (this.atrDetails.paginator) {
      this.atrDetails.paginator.firstPage();
    }
  }

  // Fetch data from backend
  fetchDelaysData() {
    this.loading = true;
    this.http.get<any[]>('https://vef.manappuram.com/api/delays')
      .subscribe(data => {
        // Mapping data into the format that will be used in the table
        this.atrDetails.data = data.map(item => ({
          USER_NAME: item[0],
          DEPARTMENT: item[1],
          Inprogress: item[2],
          TOTAL_DELAYS: item[3],
          DELAY_DAYS: item[4]
        }));

        // After fetching data, set paginator and sort
        this.atrDetails.paginator = this.paginator;
        this.atrDetails.sort = this.sort;
        this.loading = false;
      }, error => {
        console.error('Error fetching data from backend', error);
        this.loading = false;
      });
  }
}
  


