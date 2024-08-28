import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject, Observable } from 'rxjs';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { environment } from '../../enviroments/environment'; 

interface DecodedToken {
  username: string;
  role: string;
  EmpCode: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  private tokenTimer: any;
  loggedInUser: DecodedToken | null = null;
  private tokenKey = 'authToken';
  private readonly SESSION_TIMEOUT = 2 * 60 * 1000; // 10 minutes in milliseconds

  constructor(private http: HttpClient, private router: Router, private jwtHelper:JwtHelperService) {
    this.checkSessionOnInit();
  }

  registerUser(user: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const jsonData = JSON.stringify(user);

    return this.http.post<any>(`${environment.apiUrl}/register`, jsonData, { headers })
      .pipe(catchError(this.handleError));
  }

  login(user: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const json = JSON.stringify(user);

    return this.http.post<any>(`${environment.apiUrl}/login`, json, { headers })
      .pipe(
        catchError(this.handleError),
        tap(response => {
          if (response.token) {
            this.saveToken(response.token);
            this.loggedInUser = this.decodeToken(response.token);
            this.isLoggedInSubject.next(true);
            this.startSessionTimer(response.sessionExpiry);
          } else {
            throw new Error('Login failed: Missing token in response');
          }
        })
      );
  }

  saveToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  refreshToken(): Observable<any> {
    const token = this.getToken();
    if (token) {
      return this.http.post<{ token: string, sessionExpiry: number }>(`${environment.apiUrl}/refresh-token`, {}, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
      })
      .pipe(
        catchError(this.handleError.bind(this)),
        tap(response => {
          if (response.token) {
            this.saveToken(response.token);
            this.startSessionTimer(response.sessionExpiry);
          }
        })
      );
    }
    return throwError('No token available');
  }

  startSessionTimer(sessionExpiry: number) {
    if (this.tokenTimer) {
      clearTimeout(this.tokenTimer);
    }

    const currentTime = Date.now();
    const timeoutDuration = sessionExpiry - currentTime - 60000; // Refresh 1 minute before expiry

    if (timeoutDuration <= 0) {
      this.logout();
      return;
    }

    this.tokenTimer = setTimeout(() => {
      this.refreshToken().subscribe({
        error: () => {
          this.logout();
        }
      });
    }, timeoutDuration);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.isLoggedInSubject.next(false);
    this.clearUserData();
    alert("your session has been expired please log in again");
    this.router.navigate(['/login']);
  }

  clearUserData() {
    // Clear additional user-specific data if necessary
  }

  private checkSessionOnInit() {
    const token = this.getToken();
    if (token) {
      const expirationDate = this.jwtHelper.getTokenExpirationDate(token);
      if (expirationDate) {
        const sessionExpiry = expirationDate.getTime();
        if (Date.now() < sessionExpiry) {
          this.startSessionTimer(sessionExpiry);
          this.isLoggedInSubject.next(true);
          this.loggedInUser = this.decodeToken(token);
        } else {
          this.logout();
        }
      } else {
        this.logout();
      }
    } else {
      this.logout();
    }
  }

  private decodeToken(token: string): DecodedToken | null {
    if (this.jwtHelper.isTokenExpired(token)) {
      return null;
    }
    return this.jwtHelper.decodeToken(token) as DecodedToken;
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
    getUserRole(): string | undefined {
    return this.loggedInUser?.role;
  }

  getEmpCode(): number | undefined {
    return this.loggedInUser?.EmpCode;
  }

}
