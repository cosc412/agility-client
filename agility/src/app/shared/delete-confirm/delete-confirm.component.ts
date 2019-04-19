import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: 'app-delete-confirm',
  templateUrl: './delete-confirm.component.html',
  styleUrls: ['./delete-confirm.component.scss']
})
export class DeleteConfirmComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DeleteConfirmComponent>) { }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

  async confirm() {
    this.dialogRef.close();
  }

}
