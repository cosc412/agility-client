import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MatDialog} from "@angular/material";
import { TaskService } from 'src/app/auth/task.service';
import { TaskPopupComponent } from 'src/app/shared/task-popup/task-popup.component';
import { DeleteConfirmComponent } from 'src/app/shared/delete-confirm/delete-confirm.component';
import { DetailsPopupComponent } from 'src/app/shared/details-popup/details-popup.component';
import { ProjectService } from 'src/app/auth/project.service';
import { NavbarService } from 'src/app/auth/navbar.service';
import { ToasterService } from 'src/app/auth/toaster.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit {

  task;
  taskID: string;
  projID: string;

  constructor(private route: ActivatedRoute, private taskService: TaskService, private projectService: ProjectService,
    private navbarService: NavbarService, private dialog: MatDialog, private toaster: ToasterService, private auth: AuthService) { }

  ngOnInit() {
    this.auth.setRedirect('/' + this.route.snapshot.url.join('/'));
    this.route.params.subscribe(params => {
      if (params.id) {
        this.projID = params.id;
        this.navbarService.isInDetailsDash = true;
        this.navbarService.projectID = params.id;
        this.projectService.getProject(params.id).then((project: any) => {
          this.navbarService.projectName = project.name;
        }).catch((error: Error) => this.toaster.open(error.message, true));
      }
      if (params.taskID) {
        this.taskID = params.taskID;
        this.getTask();
      }
    });
  }

  createNote() {
    const dialogRef = this.dialog.open(DetailsPopupComponent, { panelClass: 'custom-container', data: {
      mode: 'note',
      task: this.task
    }});
    dialogRef.afterClosed().subscribe(val => {
      this.getTask();
    });
  }

  createBlock() {
    const dialogRef = this.dialog.open(DetailsPopupComponent, { panelClass: 'custome-container', data: {
      mode: 'block',
      task: this.task
    }});
    dialogRef.afterClosed().subscribe(val => {
      this.getTask();
    });
  }

  editTask() {
    const t = JSON.parse(JSON.stringify(this.task));
    const dialogRef = this.dialog.open(TaskPopupComponent, { panelClass: 'custom-container', data: {
      mode: 'update',
      params: t
    }});
    dialogRef.afterClosed().subscribe(val => {
      this.getTask();
    });
  }

  deleteTask() {
    this.dialog.open(DeleteConfirmComponent, { panelClass: 'custom-container', data: {
      mode: 'task',
      id: this.task._id,
      redirect: '/projects/' + this.projID
    }});
  }

  deleteBlock(block: string) {
    const dialogRef = this.dialog.open(DeleteConfirmComponent, { panelClass: 'custom-container', data: {
      mode: 'blocks',
      id: this.task._id,
      list: this.task.block,
      selected: block
    }});
    dialogRef.afterClosed().subscribe(val => {
      this.getTask();
    });
  }

  deleteNote(notes: string) {
    const dialogRef = this.dialog.open(DeleteConfirmComponent, { panelClass: 'custom-container', data: {
      mode: 'notes',
      id: this.task._id,
      list: this.task.note,
      selected: notes
    }});
    dialogRef.afterClosed().subscribe(val => {
      this.getTask();
    });
  }

  private getTask() {
    this.taskService.getTaskByID(this.taskID).then(task => {
      this.task = task;
    }).catch((error: Error) => this.toaster.open(error.message, true));
  }

}
