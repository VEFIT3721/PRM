import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
  registerUser(user:any) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const jsonData = JSON.stringify(user);
    console.log(jsonData);
    
    return this.http.post<any>('http://localhost:3000/api/register', jsonData, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }
  
  login(User:any){
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
    const json = JSON.stringify(User)
    console.log(json);
    return this.http.post<any>('http://localhost:3000/api/login', json, {headers})
    .pipe(
      catchError(this.handleError)
    );
}
private handleError(error: HttpErrorResponse) {
  console.error(
    `Backend returned code ${error.status}, body was: ${error.error}`);
  return throwError('Something bad happened; please try again later.');
}
}
