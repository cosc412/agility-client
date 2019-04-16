import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private MOCK_TEAM = [
    {
      _id: 'nvkaheia',
      name: 'John Doe',
      email: 'jdoe@gmail.com',
      profileURL: 'http://krnb.com/janetg/wp-content/uploads//sites/11/2016/01/Barack-Obama-3.jpg'
    },
    {
      _id: 'nvmewiwowoww',
      name: 'Jane Doe',
      email: 'janedoe@gmail.com',
      profileURL: 'https://content.internetvideoarchive.com/content/photos/9280/414206_001.jpg'
    },
    {
      _:'aqqwioeel',
      name: 'Scarlet Johenson',
      email: 'sjohenson@gmail.com',
      profileURL: 'https://i.ytimg.com/vi/8RDueVUvsLY/hqdefault.jpg'
    }
  ];

  // https://stackoverflow.com/questions/38846232/how-to-implement-signin-with-google-in-angular-2-using-typescript
  // https://developers.google.com/identity/sign-in/web/people
  // https://stackoverflow.com/questions/38664350/google-sign-in-with-angular2-and-typescript-where-to-get-gapi

  private auth2: any;
  private profile: any;
  user: any;

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

  getTeam(projectID: string) {
    return this.MOCK_TEAM;
  }

  private async getUser(email: string) {
    this.user = {
      _id: '1234',
      name: 'Emily Vogel',
      email: 'eav990@gmail.com',
      profileURL: 'https://www.advocate.com/sites/advocate.com/files/2017/05/16/over-the-period-of-trump-750.jpg'
    }
  }

  private listenForUser() {
    this.auth2.currentUser.listen(profile => {
      if (this.auth2.isSignedIn.get()) {
        this.profile = profile.getBasicProfile();
        this.getUser(this.profile.getEmail());
      }
    });
  }

}
