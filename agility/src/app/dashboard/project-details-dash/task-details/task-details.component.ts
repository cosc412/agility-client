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
  projID: string;

  constructor(private route: ActivatedRoute, private taskService: TaskService, private dialog: MatDialog) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.id) {
        this.projID = params.id;
      }
      if (params.taskID) {
        this.taskService.getTaskByID(params.taskID).then(task => {
          this.task = JSON.parse(task);
        });
      }
    });
  }

  createNote() {
    this.dialog.open(DetailsPopupComponent, { panelClass: 'custom-container', data: { mode: 'note', task: this.task } });
  }

  createBlock() {
    this.dialog.open(DetailsPopupComponent, { panelClass: 'custome-container', data: { mode: 'block', task: this.task } });
  }

  editTask() {
    this.dialog.open(TaskPopupComponent, { panelClass: 'custom-container', data: { mode: 'update', params: this.task } });
  }

  deleteTask() {
    this.dialog.open(DeleteConfirmComponent, { panelClass: 'custom-container', data: {
      mode: 'task',
      id: this.task._id,
      redirect: '/projects/' + this.projID
    }});
  }

  deleteBlock(block: string) {
    this.dialog.open(DeleteConfirmComponent, { panelClass: 'custom-container', data: {
      mode: 'blocks',
      id: this.task._id,
      list: this.task.block,
      selected: block
    }});
  }

  deleteNote(notes: string) {
    this.dialog.open(DeleteConfirmComponent, { panelClass: 'custom-container', data: {
      mode: 'notes',
      id: this.task._id,
      list: this.task.note,
      selected: notes
    }});
  }

}
