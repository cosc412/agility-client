import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material";
import { ProjectService } from 'src/app/auth/project.service';
import { AuthService } from 'src/app/auth/auth.service';
import { CreateProjectComponent } from '../../shared/create-project/create-project.component';

@Component({
  selector: 'app-project-dash',
  templateUrl: './project-dash.component.html',
  styleUrls: ['./project-dash.component.scss']
})
export class ProjectDashComponent implements OnInit {

  projects;

  constructor(private auth: AuthService, private project: ProjectService, private dialog: MatDialog) { }

  ngOnInit() {
    this.projects = this.project.getProjects(this.auth.user._id);
  }

  openCreateDialog() {
    this.dialog.open(CreateProjectComponent, { panelClass: 'custom-container' });
  }

}
