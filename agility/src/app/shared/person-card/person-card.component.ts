import { Component, OnInit, Input } from '@angular/core';
import { ProjectService } from 'src/app/auth/project.service';
import { AuthService } from 'src/app/auth/auth.service';
import { MatDialog } from "@angular/material";
import { DeleteConfirmComponent } from 'src/app/shared/delete-confirm/delete-confirm.component';
import { NavbarService } from 'src/app/auth/navbar.service';

@Component({
  selector: 'app-person-card',
  templateUrl: './person-card.component.html',
  styleUrls: ['./person-card.component.scss']
})
export class PersonCardComponent implements OnInit {

  @Input() member;

  constructor(private projectService: ProjectService, private auth: AuthService, private navbar: NavbarService,
    private dialog: MatDialog) { }

  ngOnInit() {
  }

  edit() {

  }

  delete() {
    this.dialog.open(DeleteConfirmComponent, { panelClass: "custom-container", data: {
      mode: 'team',
      id: this.member._id,
      projID: this.navbar.projectID
    }});
  }

}
