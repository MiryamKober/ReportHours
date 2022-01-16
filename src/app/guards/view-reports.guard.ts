import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserRole } from '../enums/userRole';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ViewReportsGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const user = this.authService.getCurrentUser();
    if (user) {
      if (user.role === UserRole.ADMIN) { return true; }
      else {
        this.router.navigate['/home'];
      }
    }
  }

}
