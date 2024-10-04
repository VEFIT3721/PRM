import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/environment'; // Corrected path to environment

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl = `${environment.apiUrl}/pending-atr-details`; // Use environment variable

  constructor(private http: HttpClient) { }

  getPendingATRDetails(searchTerm: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?searchTerm=${searchTerm}`);
  }
}
