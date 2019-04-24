import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot) {
    if (!this.auth.user)
      return false;
    else {
      this.auth.getMyProjectRole(route.params.id).then(val => {
        if (val)
          return true;
        else {
          this.router.navigate(['']);
          return false;
        }
      }).catch(e => {
        return false;
      });
    }
  }
}
