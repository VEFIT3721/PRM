import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject, Observable, of, timer } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

interface DecodedToken {
  username: string;
  role: string; // Add role property to interface
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  private tokenTimer: any;
  loggedInUser: DecodedToken | null = null; // Create a property to store decoded user info
  private blockTimeSubject = new BehaviorSubject<number>(0); // New BehaviorSubject for block time
  remainingBlockTime$ = this.blockTimeSubject.asObservable();

  constructor(private http: HttpClient,private router:Router) {}

  registerUser(user: any) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const jsonData = JSON.stringify(user);
    console.log(jsonData);

    return this.http.post<any>('http://localhost:3000/api/register', jsonData, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  login(User: any) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const json = JSON.stringify(User);
    console.log(json);

    return this.http.post<any>('http://localhost:3000/api/login', json, { headers })
      .pipe(
        catchError(this.handleError),
        tap(response => {
          if (response.token) {
            // Store token and update state on successful login
            localStorage.setItem('authToken', response.token);
            this.isLoggedInSubject.next(true);
            console.log('Token stored in local storage:', localStorage.getItem('authToken'));
            this.startTimeoutTimer();

            // Decode the token and store user info
            this.loggedInUser = response.token ? this.decodeToken(response.token) : null;
            // Clear blockExpiry on successful login
            localStorage.removeItem('blockExpiry');
          } else {
            console.error('Missing token in login response');
            // Handle login failure scenario (e.g., display error message)
            throw new Error('Login failed: Missing token in response');
          }
        })
      );
  }

   startTimeoutTimer() {
    // Set timeout duration (15 minutes in milliseconds)
    const timeoutDuration = 5 * 60 * 1000;

    return timer(timeoutDuration).pipe(
      switchMap(() => {
        console.log('Timer expired');
        this.logout();
      this.router.navigate(['/login']);
        return of(false); // Emit false to indicate timeout
      }),
      takeUntil(this.isLoggedIn$) // Stop timer if user logs in again
    );
    
  }

  logout() {
    localStorage.removeItem('authToken');
    this.isLoggedInSubject.next(false);
    this.loggedInUser = null; // Clear user info on logout
  }

  private handleError(error: HttpErrorResponse) {
    console.error(
      `Backend returned code ${error.status}, body was: ${error.error}`);
    return throwError('Something bad happened; please try again later.');
  }

 
  
  

  // Helper function to decode the JWT token
  private decodeToken(token: string): DecodedToken {
    const jwtHelper = new JwtHelperService();
    const decodedToken = jwtHelper.decodeToken(token);
    return { username: decodedToken.username, role: decodedToken.role }; // Extract username and role
  }

  // New method to retrieve the user's role
  getUserRole(): string | undefined {
  if (this.loggedInUser) {
    console.log("Role retrieved:", this.loggedInUser);
    return this.loggedInUser.role;
  } else {
    console.log("User not logged in or role not available");
    return undefined; // Explicitly return undefined for clarity
  }
}

  getToken(): string | null {
      console.log('Retrieved token from local storage:', localStorage.getItem('authToken'));

    return localStorage.getItem('authToken');

  }


  }


