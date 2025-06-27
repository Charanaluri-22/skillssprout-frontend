import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UserStoreService } from '../services/user-store.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {

  constructor(private readonly userStoreService: UserStoreService, private readonly router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.userStoreService.getUser().pipe(
      map(user => {
        if (!user?.token) {
          this.router.navigate(['/login']);
          alert("User must be logged in");
          return false;
        }

        const userRole = user.role?.toLowerCase();
        const requiredRole = route.data['role']?.toLowerCase();

        // Allow admin to access all routes
        if (userRole === 'admin') {
          return true;
        }

        // Allow user to access only user routes
        if (requiredRole && requiredRole !== userRole) {
          this.router.navigate(['/error']);
          alert("You do not have permission to access this page");
          return false;
        }

        return true;
      })
    );
  }
}
