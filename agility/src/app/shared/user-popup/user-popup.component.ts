import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: 'app-user-popup',
  templateUrl: './user-popup.component.html',
  styleUrls: ['./user-popup.component.scss']
})
export class UserPopupComponent implements OnInit {

  model = {
    email: ''
  };

  constructor(private dialogRef: MatDialogRef<UserPopupComponent>, @Inject(MAT_DIALOG_DATA) data) { }

  ngOnInit() {
  }

  cancel() {
    this.dialogRef.close();
  }

  add() {

  }

}
