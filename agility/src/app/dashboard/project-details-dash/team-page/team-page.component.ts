import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import {MatDialog} from "@angular/material";
import { UserPopupComponent } from 'src/app/shared/user-popup/user-popup.component';
import { ToasterService } from 'src/app/auth/toaster.service';
import { ProjectService } from 'src/app/auth/project.service';

@Component({
  selector: 'app-team-page',
  templateUrl: './team-page.component.html',
  styleUrls: ['./team-page.component.scss']
})
export class TeamPageComponent implements OnInit {

  projectID: string;
  team;

  constructor(private route: ActivatedRoute, private auth: AuthService, private dialog: MatDialog,
    private toaster: ToasterService, public projectService: ProjectService) { }

  ngOnInit() {
    this.auth.setRedirect('/' + this.route.snapshot.url.join('/'));
    this.route.params.subscribe(params => {
      if (params.id) {
        this.projectID = params.id;
        this.getTeam();
      }
    });
  }

  mapTeamMembers(team: any[], users: any[]) {
    team.sort((a, b) => {
      if (a.userID < b.userID)
        return -1;
      if (a.userID > b.userID)
        return 1;
      return 0;
    });
    users.sort((a, b) => {
      if (a._id < b._id)
        return -1;
      if (a._id > b._id)
        return 1;
      return 0;
    });
    const result = [];
    for (let i = 0; i < team.length; i++) {
      let member = users[i];
      member.role = team[i].role;
      result.push(member);
    }
    this.team = result;
  }

  addUser() {
    const dialogRef = this.dialog.open(UserPopupComponent, { panelClass: 'custom-container', data: {
      projectID: this.projectID,
      mode: 'create'
    }});
    dialogRef.afterClosed().subscribe(val => {
      this.getTeam();
    });
  }

  private getTeam() {
    this.auth.getProjectTeam(this.projectID).then((team: any) => {
      const userIDs = [];
      team.forEach(member => {
        userIDs.push(member.userID);
      });
      this.auth.getUsers(userIDs).then((users: any) => {
        this.mapTeamMembers(team, users);
      }).catch((error: Error) => this.toaster.open(error.message, true));
    }).catch((error: Error) => this.toaster.open(error.message, true));
  }

}
