import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { AuthService } from 'src/app/auth/auth.service';
import { ToasterService } from 'src/app/auth/toaster.service';

@Component({
  selector: 'app-user-popup',
  templateUrl: './user-popup.component.html',
  styleUrls: ['./user-popup.component.scss']
})
export class UserPopupComponent implements OnInit {

  projectID: string;
  mode: string;
  model = {
    email: '',
    role: ''
  };
  member?;

  constructor(private auth: AuthService, private dialogRef: MatDialogRef<UserPopupComponent>,
    private toaster: ToasterService, @Inject(MAT_DIALOG_DATA) data) {
      this.projectID = data.projectID;
      this.mode = data.mode;
      if (data.member) {
        this.member = data.member;
        this.model.role = data.member.role;
      }
  }

  ngOnInit() {
  }

  cancel() {
    this.dialogRef.close();
  }

  async add() {
    try {
      if (this.mode === 'create') {
        await this.auth.addUserToProject(this.projectID, this.model.email);
        this.toaster.open('Successfully added user to project!');
      }
      if (this.mode === 'update') {
        console.log(this.model.role);
      }
      this.dialogRef.close();
    } catch (error) {
      this.toaster.open(error.message);
      this.dialogRef.close();
    }
  }

}
