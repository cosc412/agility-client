import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

declare const gapi: any;

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss']
})
export class SplashComponent implements OnInit {

  // https://stackoverflow.com/questions/38846232/how-to-implement-signin-with-google-in-angular-2-using-typescript
  auth2: any;

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  /**
   * Authenticates google sign in and attaches click handler to sign in button
   */
  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '675904009128-7qot95l5mnb63pbq98d6u7ab0djshgsj.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin(document.getElementById('sign_in'));
    });
  }

  /**
   * Attaches a google sign in click handler to buttons given the button id
   * Sets the profile of auth service to returned profile
   * @param element Button id name
   */
  attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {
        let profile = googleUser.getBasicProfile();
        this.auth.profile = profile;
      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }

  ngAfterViewInit(){
    this.googleInit();
  }

}
