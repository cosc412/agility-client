import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material";
import { ProjectService } from 'src/app/auth/project.service';
import { AuthService } from 'src/app/auth/auth.service';
import { ProjectPopupComponent } from '../../shared/project-popup/project-popup.component';
import { DeleteConfirmComponent } from '../../shared/delete-confirm/delete-confirm.component';
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
    this.dialog.open(ProjectPopupComponent, { panelClass: 'custom-container', data: { mode: 'create'} });
  }

  openUpdateDialog(params) {
    this.dialog.open(ProjectPopupComponent, { panelClass: 'custom-container',
      data: { mode: 'update', params: params } });
  }

  openDeleteDialog(id: string) {
    this.dialog.open(DeleteConfirmComponent, { panelClass: 'custom-container' });
  }

}
