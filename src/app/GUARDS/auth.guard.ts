import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../SERVICE/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | boolean | UrlTree {

        const requiredRoles = route.data['roles'] as string[]; // Access roles from route data

        return this.authService.isLoggedIn$.pipe(
            map(isLoggedIn => {
                if (!isLoggedIn) {
                    return false; // Not logged in, redirect
                }

                const userRole = this.authService.getUserRole() as string; // Get user role
                console.log("Retrieved user role:", userRole); // Log the retrieved user role
                if (!userRole) {
  // Handle the case where userRole is undefined (e.g., redirect to login)
  return false;
}
                return requiredRoles.includes(userRole); // Check if role is authorized
            })
        );
    }
}
