import { Component, OnInit } from '@angular/core';
import { getDefaultService } from 'selenium-webdriver/chrome';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss']
})
export class SplashComponent implements OnInit {

  //https://stackoverflow.com/questions/38846232/how-to-implement-signin-with-google-in-angular-2-using-typescript

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  onClick() {
    
  }

}
