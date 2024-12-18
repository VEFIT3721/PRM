import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http:HttpClient) { }

  getEmail(meetingId: string,recipientEmail: string,DeptHod:string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const jsonData = JSON.stringify({ meetingId, recipientEmail,DeptHod });
    return this.http.post<any>('http://localhost:3000/api/send-meeting-email', jsonData, { headers })
  }
  private handleError(error: HttpErrorResponse) {
  console.error(
    `Backend returned code ${error.status}, body was: ${error.error}`);
  return throwError('Something bad happened; please try again later.');
  }
  
}
