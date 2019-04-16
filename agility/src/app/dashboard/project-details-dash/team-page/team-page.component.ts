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
        this.team = this.auth.getTeam(params.id);
      }
    });
  }

}
