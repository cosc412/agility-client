import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  profile;

  constructor() { }

  onSignIn(googleUser) {
    this.profile = googleUser.getBasicProfile();
    console.log(this.profile.getName());
  }
}
