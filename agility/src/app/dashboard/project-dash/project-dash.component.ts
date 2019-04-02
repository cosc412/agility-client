import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/auth/project.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-project-dash',
  templateUrl: './project-dash.component.html',
  styleUrls: ['./project-dash.component.scss']
})
export class ProjectDashComponent implements OnInit {

  projects;

  constructor(private auth: AuthService, private project: ProjectService) { }

  ngOnInit() {
    this.projects = this.project.getProjects(this.auth.user._id);
  }

}
