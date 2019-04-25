import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material";
import { ProjectService } from 'src/app/auth/project.service';
import { AuthService } from 'src/app/auth/auth.service';
import { ProjectPopupComponent } from '../../shared/project-popup/project-popup.component';
import { DeleteConfirmComponent } from '../../shared/delete-confirm/delete-confirm.component';
import { NavbarService } from 'src/app/auth/navbar.service';
import { ToasterService } from 'src/app/auth/toaster.service';

@Component({
  selector: 'app-project-dash',
  templateUrl: './project-dash.component.html',
  styleUrls: ['./project-dash.component.scss']
})
export class ProjectDashComponent implements OnInit {

  projects;

  constructor(private auth: AuthService, private project: ProjectService, private navbarService: NavbarService,
    private dialog: MatDialog, private toaster: ToasterService) { }

  ngOnInit() {
    let role = [];
    let projs = [];
    this.auth.getMyProjectRoles().then((roles: any) => {
      role = JSON.parse(roles);
      this.project.getProjects().then((p: any[]) => {
        projs = p;
        this.mapStatus(role, projs);
      }).catch((error: Error) => this.toaster.open(error.message));
    }).catch((error: Error) => this.toaster.open(error.message));
    this.navbarService.isInDetailsDash = false;
  }

  mapStatus(roles, projs) {
    roles.sort((a, b) => {
      if (a.projectID < b.projectID)
        return -1;
      if (a.projectID > b.projectID)
        return 1;
      return 0;
    });
    projs.sort((a, b) => {
      if (a._id < b._id)
        return -1;
      if (a._id > b._id)
        return 1;
      return 0;
    });

    const p = [];
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].projectID === projs[i]._id) {
        let v = projs[i];
        v.role = roles[i].role;
        p.push(v);
      }
    }
    this.projects = p;
  }

  openCreateDialog() {
    this.dialog.open(ProjectPopupComponent, { panelClass: 'custom-container', data: { mode: 'create'} });
  }

  openUpdateDialog(params) {
    const p = JSON.parse(JSON.stringify(params));
    this.dialog.open(ProjectPopupComponent, { panelClass: 'custom-container',
      data: { mode: 'update', params: p } });
  }

  openDeleteDialog(id: string) {
    this.dialog.open(DeleteConfirmComponent, { panelClass: 'custom-container', data: { mode: 'project', id: id } });
  }

}
