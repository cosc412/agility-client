import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/auth/navbar.service';
import { ProjectService } from 'src/app/auth/project.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-details-dash',
  templateUrl: './project-details-dash.component.html',
  styleUrls: ['./project-details-dash.component.scss']
})
export class ProjectDetailsDashComponent implements OnInit {

  project;

  constructor(private navbarService: NavbarService, private projectService: ProjectService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.navbarService.isInDetailsDash = true;
    this.route.params.subscribe(params => {
      if (params.id) {
        this.project = this.projectService.getProject(params.id);
      }
    });
  }

}
