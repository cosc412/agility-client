import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { TaskService } from 'src/app/auth/task.service';

@Component({
  selector: 'app-task-popup',
  templateUrl: './task-popup.component.html',
  styleUrls: ['./task-popup.component.scss']
})
export class TaskPopupComponent implements OnInit {

  mode: string;
  sprintID: string;
  model = {
    _id: '',
    sprintID: '',
    due: new Date(),
    header: '',
    description: '',
    note: [],
    block: []
  };

  constructor(private dialogRef: MatDialogRef<TaskPopupComponent>, private taskService: TaskService,
    @Inject(MAT_DIALOG_DATA) data) {
      this.mode = data.mode;
      this.sprintID = data.sprintID;
      if (this.mode === 'update') {
        this.model = data.params;
      }
    }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

  async create() {
    if (this.mode === 'create') {
      await this.taskService.createTask(this.sprintID, this.model);
    }
    else {
      await this.taskService.updateTask(this.model._id, this.model);
    }
    this.dialogRef.close();
  }

}
