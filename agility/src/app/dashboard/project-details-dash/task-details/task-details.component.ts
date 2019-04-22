import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MatDialog} from "@angular/material";
import { TaskService } from 'src/app/auth/task.service';
import { TaskPopupComponent } from 'src/app/shared/task-popup/task-popup.component';
import { DeleteConfirmComponent } from 'src/app/shared/delete-confirm/delete-confirm.component';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit {

  task;

  constructor(private route: ActivatedRoute, private taskService: TaskService, private dialog: MatDialog) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.taskID) {
        this.task = this.taskService.getTaskByID(params.taskID);
      }
    });
  }

  editTask() {
    this.dialog.open(TaskPopupComponent, { panelClass: 'custom-container', data: { mode: 'update', params: this.task } });
  }

  deleteTask() {
    this.dialog.open(DeleteConfirmComponent, { panelClass: 'custom-container' });
  }

}
