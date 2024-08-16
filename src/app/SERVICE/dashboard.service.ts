import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }
  private apiUrl = 'http://localhost:3000/api/pending-atr-details';

  
  getPendingATRDetails(searchTerm: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?searchTerm=${searchTerm}`);
  }
}
