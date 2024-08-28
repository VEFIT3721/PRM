import { HttpClient, HttpClientModule, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  constructor(private http:HttpClient,private authService:AuthService) { }

  
saveMeetingData(data: any) {
  const headers = new HttpHeaders().set('Content-Type', 'application/json');
  const jsonData = JSON.stringify(data);
  console.log(jsonData);
  
  return this.http.post<any>('http://localhost:3000/api/save-meeting', jsonData, { headers })
    .pipe(
      catchError(this.handleError)
    );
}
getData(): Observable<Blob> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  });

  return this.http.get('http://localhost:3000/api/export-meetings', {
    responseType: 'blob',
    headers: headers
  }).pipe(
    catchError(this.handleError)
  );
}
getProducts(): Observable<any[]> {
  return this.http.get<any[]>('http://localhost:3000/api/data');
}

getMeetingDetailsById(meetingId: string): Observable<any> {
  const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('authToken')}`); // Include JWT token

  return this.http.get<any>(`http://localhost:3000/api/get-meeting-by-id/${meetingId}`, { headers })
    .pipe(
      catchError(this.handleError)
    );
}

 updateMeetingRemark(meetingId: string, remark: string,updatedBy: string): Observable<any> {
   console.log('updateMeetingRemark called with:', meetingId, remark);
   if (this.authService.getUserRole() !== 'maker') {

    console.error('User does not have the necessary role to update the meeting remark');

    throw new Error('Unauthorized: User does not have the necessary role');

  }
   const token = this.authService.getToken();
   console.log("Received Token:-",token)
   const headers = new HttpHeaders().set('Content-Type', 'application/json')
   .set('Authorization', `Bearer ${this.authService.getToken()}`);
  const jsonData = JSON.stringify({ remark,updatedBy });

  return this.http.put<any>(`http://localhost:3000/api/meetings/${meetingId}/remark`, jsonData, { headers })
    .pipe(
      catchError(this.handleError)
    );
}

private handleError(error: HttpErrorResponse) {
  console.error(
    `Backend returned code ${error.status}, body was: ${error.error}`);
  return throwError('Something bad happened; please try again later.');
}
  // get emp details by entering emp code
  getEmployeeDetails(employeeCode: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<any>(
      `http://localhost:3000/api/employees/${employeeCode}`,
      { headers }
    );
  }
}
