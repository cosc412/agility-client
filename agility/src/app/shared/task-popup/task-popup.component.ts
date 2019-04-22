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
  model;

  constructor(private dialogRef: MatDialogRef<TaskPopupComponent>, private taskService: TaskService,
    @Inject(MAT_DIALOG_DATA) data) { }

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
