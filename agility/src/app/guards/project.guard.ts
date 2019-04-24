import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    try {
      let role = await this.auth.getMyProjectRole(route.params.id);
      role = JSON.parse(role);
      if (role)
        return true;
      this.router.navigate(['']);
      return false;
    } catch {
      this.router.navigate(['']);
      return false;
    }
  }
}
