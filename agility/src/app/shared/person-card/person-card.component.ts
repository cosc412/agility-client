import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProjectService } from 'src/app/auth/project.service';
import { AuthService } from 'src/app/auth/auth.service';
import { MatDialog } from "@angular/material";
import { DeleteConfirmComponent } from 'src/app/shared/delete-confirm/delete-confirm.component';
import { UserPopupComponent } from 'src/app/shared/user-popup/user-popup.component';
import { NavbarService } from 'src/app/auth/navbar.service';

@Component({
  selector: 'app-person-card',
  templateUrl: './person-card.component.html',
  styleUrls: ['./person-card.component.scss']
})
export class PersonCardComponent implements OnInit {

  @Input() member;
  @Output() change: EventEmitter<boolean> = new EventEmitter();

  constructor(private projectService: ProjectService, private auth: AuthService, private navbar: NavbarService,
    private dialog: MatDialog) { }

  ngOnInit() {
  }

  edit() {
    const dialogRef = this.dialog.open(UserPopupComponent, { panelClass: 'custom-container', data: {
      mode: 'update',
      projectID: this.navbar.projectID,
      member: this.member
    }});
    dialogRef.afterClosed().subscribe(val => {
      this.change.emit(true);
    });
  }

  delete() {
    const dialogRef = this.dialog.open(DeleteConfirmComponent, { panelClass: 'custom-container', data: {
      mode: 'team',
      id: this.member._id,
      projID: this.navbar.projectID
    }});
    dialogRef.afterClosed().subscribe(val => {
      this.change.emit(true);
    });
  }

}
