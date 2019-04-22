import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { TaskService } from 'src/app/auth/task.service';

@Component({
  selector: 'app-details-popup',
  templateUrl: './details-popup.component.html',
  styleUrls: ['./details-popup.component.scss']
})
export class DetailsPopupComponent implements OnInit {

  mode: string;
  model = {
    description: ''
  };

  constructor(private dialogRef: MatDialogRef<DetailsPopupComponent>, private taskService: TaskService,
    @Inject(MAT_DIALOG_DATA) data) {
      this.mode = data.mode;
    }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

  async create() {
    if (this.mode === 'note') {
      this.taskService.addNote();
    }
    else {
      this.taskService.addBlock();
    }
    this.dialogRef.close();
  }

}
