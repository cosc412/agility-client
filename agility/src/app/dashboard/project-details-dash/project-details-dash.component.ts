import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/auth/navbar.service';

@Component({
  selector: 'app-project-details-dash',
  templateUrl: './project-details-dash.component.html',
  styleUrls: ['./project-details-dash.component.scss']
})
export class ProjectDetailsDashComponent implements OnInit {

  constructor(private navbarService: NavbarService) { }

  ngOnInit() {
    this.navbarService.isInDetailsDash = true;
  }

}
