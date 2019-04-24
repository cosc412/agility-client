import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-team-page',
  templateUrl: './team-page.component.html',
  styleUrls: ['./team-page.component.scss']
})
export class TeamPageComponent implements OnInit {

  team;

  constructor(private route: ActivatedRoute, private auth: AuthService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.id) {
        this.auth.getProjectTeam(params.id).then((t: any) => {
          const team = JSON.parse(t);
          const userIDs = [];
          team.forEach(member => {
            userIDs.push(member.userID);
          });
          this.auth.getUsers(userIDs).then((u: any) => {
            const users = JSON.parse(u);
            this.mapTeamMembers(team, users);
          });
        });
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
    console.log('Adding user...');
  }

}
