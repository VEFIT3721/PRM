import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../SERVICE/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService,private router:Router,private snackBar: MatSnackBar) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | boolean | UrlTree {

        const requiredRoles = route.data['roles'] as string[]; // Access roles from route data

        return this.authService.isLoggedIn$.pipe(
            map(isLoggedIn => {
                if (!isLoggedIn) {
                    this.router.navigate(['/login'])
                    return false; // Not logged in, redirect
                }

                const userRole = this.authService.getUserRole() as string; // Get user role
                console.log("Retrieved user role:", userRole); // Log the retrieved user role
                if (!userRole) {

  // Handle the case where userRole is undefined (e.g., redirect to login)
  return false;
                }
                // Check if role is authorized
                if (!requiredRoles.includes(userRole)) {
                    // Show snackbar notification
                    this.snackBar.open('You do not have access to this resource.', 'Close', {
                        duration: 5000, // Duration in milliseconds
                        horizontalPosition: 'right',
                        verticalPosition: 'top'
                    });

                    // Redirect to home or another page
                    this.router.navigate(['/home']); // Redirect to home or an appropriate page
                    return false;
                }

                return true;
            })
           
        );
    }
}
