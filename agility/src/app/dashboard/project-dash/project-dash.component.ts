import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material";
import { ProjectService } from 'src/app/auth/project.service';
import { AuthService } from 'src/app/auth/auth.service';
import { CreateProjectComponent } from '../../shared/create-project/create-project.component';
import { NavbarService } from 'src/app/auth/navbar.service';

@Component({
  selector: 'app-project-dash',
  templateUrl: './project-dash.component.html',
  styleUrls: ['./project-dash.component.scss']
})
export class ProjectDashComponent implements OnInit {

  projects;

  constructor(private auth: AuthService, private project: ProjectService, private navbarService: NavbarService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.projects = this.project.getProjects();
    this.navbarService.isInDetailsDash = false;
  }

  openCreateDialog() {
    this.dialog.open(CreateProjectComponent, { panelClass: 'custom-container', data: { mode: 'create'} });
  }

  openUpdateDialog(params) {
    this.dialog.open(CreateProjectComponent, { panelClass: 'custom-container', data: { mode: 'update' } });
  }

  openDeleteDialog(id: string) {
    console.log(id);
  }

}
