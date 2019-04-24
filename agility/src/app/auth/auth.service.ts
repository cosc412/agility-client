import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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
  user: any;

  constructor(private router: Router, private http: HttpClient) {
    this.init();
  }

  signIn() {
    this.auth2.signIn().then(() => {
      this.profile = this.auth2.currentUser.get().getBasicProfile();
      this.getUser();
      this.router.navigate(['/projects']);
    });
  }

  signOut() {
    this.auth2.signOut();
    this.user = undefined;
    localStorage.removeItem('agility_cookie');
    this.router.navigate(['']);
  }

  getTeam(projectID: string) {
    
  }

  getMyProjectRoles() {
    return this.http.get('http://localhost:3000/users/'+this.user._id, {responseType: 'text'}).toPromise();
  }

  getMyProjectRole(projectID: string) {
    return this.http.get('http://localhost:3000/users/'+this.user._id+'/projects/'+projectID, {responseType: 'text'}).toPromise();
  }

  private init() {
    this.parseCookie();
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

  private async getUser() {
    this.http.post('http://localhost:3000/users',
      {
        token: this.auth2.currentUser.get().getAuthResponse().id_token,
        name: this.profile.getName(),
        email: this.profile.getEmail(),
        profileURL: this.profile.getImageUrl()
      },
      {responseType: 'text'}).toPromise().then(user => {
        this.user = JSON.parse(user);
        let expirable = this.user;
        expirable.expire = new Date(new Date().getTime() + (60 * 60 * 1000)); // Set expiration time for one hour from now 
        const cookie = btoa(JSON.stringify(expirable));
        localStorage.setItem('agility_cookie', cookie);
    });
  }

  private listenForUser() {
    this.auth2.currentUser.listen(profile => {
      if (this.auth2.isSignedIn.get()) {
        this.profile = profile.getBasicProfile();
        this.getUser();
      }
    });
  }

  private parseCookie() {
    let c = localStorage.getItem('agility_cookie');
    if (c) {
      const cookie = JSON.parse(atob(c));
      if (Date.parse(cookie.expire) > new Date().getTime()) { // If cookie hasn't expired, get user data
        this.user = cookie;
        this.router.navigate(['/projects']);
      }
      else {                                                  // Else remove cookie from local storage
        localStorage.removeItem('agility_cookie');
        this.router.navigate(['']);
      }
    }
  }

}
