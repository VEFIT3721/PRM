import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
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
  userData(data: any) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const jsonData = JSON.stringify(data);
    console.log(jsonData);
    
    return this.http.post<any>(`${this.apiUrl}/user-master`, jsonData, { headers })
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
    
    
    // if (this.authService.getUserRole() !== 'USER'|| 'CHECKER') {
    //   console.error('User does not have the necessary role to update the meeting remark');
    //   alert("User does not have the necessary role to update the meeting remark")
    //   throw new Error('Unauthorized: User does not have the necessary role');
    // }
  
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
  // getMeetingFiles(meetingId: string): Observable<any[]> {
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('authToken')}`);
  //   return this.http.get<any[]>(`${this.apiUrl}/get-files-by-meeting-id/${meetingId}`, { headers })
  
  //     .pipe(
  //       catchError(this.handleError)
  //     );
  // }

  // getMeetingFiles(meetingId: string): Observable<any[]> {
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('authToken')}`);
  //   return this.http.get<any[]>(`${this.apiUrl}/get-files-by-meeting-id/${meetingId}`, { headers }).pipe(
  //     catchError((error: HttpErrorResponse) => {
  //       if (error.status === 404) {
  //         // Extract the error message from the backend's JSON response
  //         const errorMessage = error.error.message || 'No files found for this meeting ID.';
  //         return throwError(() => new Error(errorMessage));
  //       } else {
  //         return throwError(() => new Error('Something went wrong; please try again later.'));
  //       }
  //     })
  //   );
  // }
  getMeetingFiles(meetingId: string): Observable<any[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('authToken')}`);
    return this.http.get<any[]>(`${this.apiUrl}/get-files-by-meeting-id/${meetingId}`, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          const errorMessage = error.error.message || 'No files found for this meeting ID.';
          return throwError(() => new Error(errorMessage));
        } else {
          return throwError(() => new Error('Something went wrong; please try again later.'));
        }
      })
    );
  }
  
  
  
  getMeetingFilesPreview(meetingId: string): Observable<any[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('authToken')}`);
    return this.http.get<any[]>(`${this.apiUrl}/get-files-by-meeting-id/${meetingId}`, { headers })
      .pipe(
        map((files: any[]) => {
          // Assuming the files have 'fileData' as a Blob (if not, handle accordingly)
          return files.map(file => ({
            ...file,
            fileData: new Blob([file.fileData], { type: file.fileType }) // Convert to Blob if necessary
          }));
        }),
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
    return this.http.put<any>(`${this.apiUrl}/meetings/${meetingId}/misRemark`, jsonData, { headers })
      .pipe(
        catchError(this.handleError)
      )
  }
  

  private handleError(error: HttpErrorResponse) {
    console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    return throwError('Something bad happened; please try again later.');
  }
}
