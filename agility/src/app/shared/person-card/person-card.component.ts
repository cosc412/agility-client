import { Component, OnInit, Input } from '@angular/core';
import { ProjectService } from 'src/app/auth/project.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-person-card',
  templateUrl: './person-card.component.html',
  styleUrls: ['./person-card.component.scss']
})
export class PersonCardComponent implements OnInit {

  @Input() member;

  constructor(private projectService: ProjectService, private auth: AuthService) { }

  ngOnInit() {
  }

}
