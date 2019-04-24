import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.auth.user) {
      return false;
    }
    try {
      let role = await this.auth.getMyProjectRole(route.params.id);
      role = JSON.parse(role);
      if (role)
        return true;
      return false;
    } catch {
      return false;
    }
  }
}
