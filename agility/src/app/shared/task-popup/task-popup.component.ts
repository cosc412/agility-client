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
      this.taskService.createTask();
    }
    else {
      this.taskService.updateTask();
    }
    this.dialogRef.close();
  }

}
