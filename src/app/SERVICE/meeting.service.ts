import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { environment } from '../../enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  private apiUrl = environment.apiUrl; // Use environment variable

  constructor(private http: HttpClient, private authService: AuthService) { }

  saveMeetingData(data: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const jsonData = JSON.stringify(data);
    console.log(jsonData);
    
    return this.http.post<any>(`${this.apiUrl}/save-meeting`, jsonData, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  getData(): Observable<Blob> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });

    return this.http.get(`${this.apiUrl}/export-meetings`, {
      responseType: 'blob',
      headers: headers
    }).pipe(
      catchError(this.handleError)
    );
  }

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/data`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getMeetingDetailsById(meetingId: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('authToken')}`);
    
    return this.http.get<any>(`${this.apiUrl}/get-meeting-by-id/${meetingId}`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  updateMeetingRemark(meetingId: string, formData: FormData): Observable<any> {
    console.log('updateMeetingRemark called with:', meetingId, formData);
    
    if (this.authService.getUserRole() !== 'USER') {
      console.error('User does not have the necessary role to update the meeting remark');
      throw new Error('Unauthorized: User does not have the necessary role');
    }
  
    const token = this.authService.getToken();
    console.log("Received Token:", token);
    
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`); // 'Content-Type' is automatically set for FormData
  
    return this.http.put<any>(`${this.apiUrl}/meetings/${meetingId}/remark`, formData, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

    // Fetch files associated with a meeting ID
  getMeetingFiles(meetingId: string): Observable<any[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('authToken')}`);
    return this.http.get<any[]>(`${this.apiUrl}/get-files-by-meeting-id/${meetingId}`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }


  getEmployeeDetails(employeeCode: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<any>(`${this.apiUrl}/employees/${employeeCode}`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    return throwError('Something bad happened; please try again later.');
  }
}
