import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MatDialog} from "@angular/material";
import { TaskService } from 'src/app/auth/task.service';
import { TaskPopupComponent } from 'src/app/shared/task-popup/task-popup.component';
import { DeleteConfirmComponent } from 'src/app/shared/delete-confirm/delete-confirm.component';
import { DetailsPopupComponent } from 'src/app/shared/details-popup/details-popup.component';

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
        this.taskService.getTaskByID(params.taskID).then(task => {
          this.task = JSON.parse(task);
        });
      }
    });
  }

  createNote() {
    this.dialog.open(DetailsPopupComponent, { panelClass: 'custom-container', data: { mode: 'note' } });
  }

  createBlock() {
    this.dialog.open(DetailsPopupComponent, { panelClass: 'custome-container', data: { mode: 'block' } });
  }

  editTask() {
    this.dialog.open(TaskPopupComponent, { panelClass: 'custom-container', data: { mode: 'update', params: this.task } });
  }

  deleteTask() {
    this.dialog.open(DeleteConfirmComponent, { panelClass: 'custom-container' });
  }

  deleteBlock() {
    this.dialog.open(DeleteConfirmComponent, { panelClass: 'custom-container' });
  }

  deleteNote() {
    this.dialog.open(DeleteConfirmComponent, { panelClass: 'custom-container' });
  }

}
