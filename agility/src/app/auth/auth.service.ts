import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // https://stackoverflow.com/questions/38846232/how-to-implement-signin-with-google-in-angular-2-using-typescript
  // https://developers.google.com/identity/sign-in/web/people
  // https://stackoverflow.com/questions/38664350/google-sign-in-with-angular2-and-typescript-where-to-get-gapi

  private auth2: any;
  private profile: any;
  user;

  constructor(private router: Router) {
    this.init();
  }

  private init() {
    gapi.load('auth2', () => {
      let auth = gapi.auth2.init({
        client_id: '675904009128-7qot95l5mnb63pbq98d6u7ab0djshgsj.apps.googleusercontent.com',
        fetch_basic_profile: true,
        scope: 'profile'
      });
      this.auth2 = auth;
      this.listenForUser();
    });
  }

  signIn() {
    this.auth2.signIn().then(() => {
      this.profile = this.auth2.currentUser.get().getBasicProfile();
    });
  }

  signOut() {
    this.auth2.signOut();
    this.user = undefined;
    this.router.navigate(['']);
  }

  private async getUser(email: string) {
    this.user = {
      _id: '1234',
      name: 'Emily Vogel',
      email: 'eav990@gmail.com'
    }
  }

  private listenForUser() {
    this.auth2.currentUser.listen(profile => {
      if (profile) {
        this.profile = profile.getBasicProfile();
        this.getUser(this.profile.getEmail());
      }
    });
  }

}
