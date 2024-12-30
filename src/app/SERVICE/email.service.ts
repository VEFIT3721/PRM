import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../enviroments/environment'; // Corrected path to environment

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private apiUrl = `${environment.apiUrl}/send-meeting-email`; // Use environment variable

<<<<<<< HEAD
  constructor(private http: HttpClient) { }

  getEmail(meetingId: string, recipientEmail: string, DeptHod: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const jsonData = JSON.stringify({ meetingId, recipientEmail, DeptHod });

    return this.http.post<any>(this.apiUrl, jsonData, { headers })
      .pipe(
        catchError(this.handleError) // Apply error handling
      );
=======
  getEmail(meetingId: string,recipientEmail: string,DeptHod:string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const jsonData = JSON.stringify({ meetingId, recipientEmail,DeptHod });
    return this.http.post<any>('http://localhost:3000/api/send-meeting-email', jsonData, { headers })
>>>>>>> e632e89d2ec4c1d61e17a7fdf59b1897d1a5a8cf
  }

  private handleError(error: HttpErrorResponse) {
    console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    return throwError('Something bad happened; please try again later.');
  }
}
