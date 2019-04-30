import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { NavbarService } from 'src/app/auth/navbar.service';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss']
})
export class SplashComponent implements OnInit {

  constructor(public auth: AuthService, private navbarService: NavbarService) { }

  ngOnInit() {
    this.navbarService.isInDetailsDash = false;
  }

}
