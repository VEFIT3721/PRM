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

  getMeetingStatus(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/api/meeting-status');
  }
getMeetingDetailsById(meetingId: string): Observable<any> {
  const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('authToken')}`); // Include JWT token

  return this.http.get<any>(`http://localhost:3000/api/get-meeting-by-id/${meetingId}`, { headers })
    .pipe(
      catchError(this.handleError)
    );
}

 updateMeetingRemark(meetingId: string, remark: string,updatedBy: string,formData:FormData): Observable<any> {
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
//  updateMISRemark(meetingId: string, misRemark: string, updatedBy: string): Observable<any> {
//     return this.http.put(`http:localhost:3000/api/${meetingId}/mis-remark`, { misRemark, updatedBy });
//   }
updateMISRemark(meetingId: string, updatedRemark: string, updatedBy: string,userRemark:string): Observable<any> {
    console.log('updateMISRemark called with:', meetingId, updatedRemark);
    // if (this.authService.getUserRole() !== 'maker') {
    //   console.error('User does not have the necessary role to update the meeting remark');
    //   throw new Error('Unauthorized: User does not have the necessary role');
    // }
    const token = this.authService.getToken();
    console.log("Received Token:-", token)
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${this.authService.getToken()}`
      );
    const jsonData = JSON.stringify({
     MIS_STATUS: updatedRemark, // Ensure this matches what the backend expects
      updatedBy: updatedBy,
    userRemark:userRemark
    });
    console.log('Payload to send:', jsonData); // Log the payload
    return this.http.put<any>(`http://localhost:3000/api/meetings/${meetingId}/misRemark`, jsonData, { headers })
      .pipe(
        catchError(this.handleError)
      )
  }

  uploadFile(meetingId: string, file: Blob, remark: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, 'uploadedFile');
    formData.append('remark', remark);
    formData.append('meetingId', meetingId);

    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getToken()}`);
    return this.http.put<any>(`http://localhost:3000/api/meetings/${meetingId}/remark`, formData, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Fetch files associated with a meeting ID
  getMeetingFiles(meetingId: string): Observable<any[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('authToken')}`);
    return this.http.get<any[]>(`http://localhost:3000/api/get-files-by-meeting-id/${meetingId}`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }
   updateUserRemark(meetingId: string, updatedRemark: string, updatedBy: string): Observable<any> {
    return this.http.put(`http:localhost:3000/api/${meetingId}/user-remark`, { updatedRemark, updatedBy });
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
