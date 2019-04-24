import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-user-popup',
  templateUrl: './user-popup.component.html',
  styleUrls: ['./user-popup.component.scss']
})
export class UserPopupComponent implements OnInit {

  projectID: string;
  model = {
    email: ''
  };

  constructor(private auth: AuthService, private dialogRef: MatDialogRef<UserPopupComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
      this.projectID = data.projectID;
  }

  ngOnInit() {
  }

  cancel() {
    this.dialogRef.close();
  }

  async add() {
    await this.auth.addUserToProject(this.projectID, this.model.email);
    this.dialogRef.close();
  }

}
