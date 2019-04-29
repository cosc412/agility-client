import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToasterService } from 'src/app/auth/toaster.service';

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
  private redirect: any;
  user: any;

  constructor(private router: Router, private http: HttpClient, private toaster: ToasterService,
    private zone: NgZone) {
      this.init();
  }

  signIn() {
    this.auth2.signIn().then(() => {
      this.profile = this.auth2.currentUser.get().getBasicProfile();
    }).catch((error: Error) => this.toaster.open(error.message, true));
  }

  signOut() {
    this.auth2.signOut();
    this.user = undefined;
    localStorage.removeItem('agility_cookie');
    this.router.navigate(['']);
  }

  getMyProjectRoles() {
    return this.http.get('http://localhost:3000/users/'+this.user._id, {
      headers: new HttpHeaders().set('authorization', this.getUserToken())
    }).toPromise();
  }

  getMyProjectRole(projectID: string) {
    return this.http.get('http://localhost:3000/users/'+this.user._id+'/projects/'+projectID, {
      headers: new HttpHeaders().set('authorization', this.getUserToken())
    }).toPromise();
  }

  getProjectTeam(projID: string) {
    return this.http.get('http://localhost:3000/projects/'+projID+'/team', {
      headers: new HttpHeaders().set('authorization', this.getUserToken())
    }).toPromise();
  }

  getUsers(userIDs: string[]) {
    return this.http.post('http://localhost:3000/users', {
      userIDs: userIDs
    }, {
      headers: new HttpHeaders().set('authorization', this.getUserToken())
    }).toPromise();
  }

  addUserToProject(projectID: string, email: string) {
    return this.http.post('http://localhost:3000/projects/'+projectID+'/team', {
      email: email
    }, {
      responseType: 'text',
      headers: new HttpHeaders().set('authorization', this.getUserToken())
    }).toPromise();
  }

  removeUserFromProject(projectID: string, userID: string) {
    return this.http.delete('http://localhost:3000/users/'+userID+'/projects/'+projectID, {
      headers: new HttpHeaders().set('authorization', this.getUserToken())
    }).toPromise();
  }

  updateUserInProject(projectID: string, userID: string, role: string) {
    return this.http.patch('http://localhost:3000/projects/'+projectID+'/team', {
      userID: userID,
      role: role
    }, {
      headers: new HttpHeaders().set('authorization', this.getUserToken())
    }).toPromise();
  }

  getUserToken(): string {
    if (this.auth2 !== undefined) {
      return this.auth2.currentUser.get().getAuthResponse().id_token;
    }
  }

  setRedirect(url: string) {
    this.redirect = url;
    this.setCookie();
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
    this.http.post('http://localhost:3000/users/validate',
      {
        token: this.getUserToken(),
        name: this.profile.getName(),
        email: this.profile.getEmail(),
        profileURL: this.profile.getImageUrl()
      }).toPromise().then(user => {
        this.user = user;
        this.setCookie();
        if (this.redirect) {
          this.zone.run(() => this.router.navigate([this.redirect]));
        } else {
          this.zone.run(() => this.router.navigate(['/projects']));
        }
    }).catch((error: Error) => this.toaster.open(error.message, true));
  }

  private listenForUser() {
    this.auth2.currentUser.listen(profile => {
      if (this.auth2.isSignedIn.get()) {
        this.profile = profile.getBasicProfile();
        this.getUser();
      }
    });
  }

  private setCookie() {
    let expirable = this.user;
    expirable.expire = new Date(new Date().getTime() + (60 * 60 * 1000)); // Set expiration time for one hour from now
    expirable.redirect = this.redirect;
    const cookie = btoa(JSON.stringify(expirable));
    localStorage.setItem('agility_cookie', cookie);
  }

  private parseCookie() {
    let c = localStorage.getItem('agility_cookie');
    if (c) {
      const cookie = JSON.parse(atob(c));
      if (Date.parse(cookie.expire) > new Date().getTime()) { // If cookie hasn't expired, get user data
        this.user = cookie;
        this.redirect = cookie.redirect;
      }
      else {                                                  // Else remove cookie from local storage
        localStorage.removeItem('agility_cookie');
        this.router.navigate(['']);
      }
    }
  }

}
