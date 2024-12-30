import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject, Observable, of, timer } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { environment } from '../../enviroments/environment'; // Import environment configuration

interface DecodedToken {
  username: string;
  role: string; // Add role property to interface
  EmpCode:number;
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

  constructor(private http: HttpClient, private router: Router) {}

  registerUser(user: any) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const jsonData = JSON.stringify(user);
    console.log(jsonData);

    return this.http.post<any>(`${environment.apiUrl}/register`, jsonData, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  login(User: any) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const json = JSON.stringify(User);
    console.log(json);

    return this.http.post<any>(`${environment.apiUrl}/login`, json, { headers })
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
    console.error
      ('Error:', error);
      return throwError(error);
  }

  // Helper function to decode the JWT token
  private decodeToken(token: string): DecodedToken {
    const jwtHelper = new JwtHelperService();
    const decodedToken = jwtHelper.decodeToken(token);
    return { username: decodedToken.username, role: decodedToken.role,EmpCode:decodedToken.EmpCode }; // Extract username and role
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
  getEmpCode(): number | undefined {
    if (this.loggedInUser) {
      console.log("Employee Code retrieved:", this.loggedInUser.EmpCode);
      return this.loggedInUser.EmpCode;
    } else {
      console.log("User not logged in or empCode not available");
      return undefined;
    }
  }

  getToken(): string | null {
    console.log('Retrieved token from local storage:', localStorage.getItem('authToken'));
    return localStorage.getItem('authToken');
  }

  requestPasswordReset(email: string): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/forgot-password`, { email });
  }

  resetPassword(token: string, newPassword: string,Changed_By:string ): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/reset-password`, { token, newPassword, Changed_By })
    .pipe(
      catchError(this.handleError)
    );
}
  }

