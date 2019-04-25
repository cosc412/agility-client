import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { ToasterService } from '../auth/toaster.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router, private toaster: ToasterService) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    try {
      let role = await this.auth.getMyProjectRole(route.params.id);
      role = JSON.parse(role);
      if (role)
        return true;
      this.router.navigate(['']);
      return false;
    } catch (error) {
      this.router.navigate(['']);
      this.toaster.open(error.message);
      return false;
    }
  }
}
