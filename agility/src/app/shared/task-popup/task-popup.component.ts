import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { TaskService } from 'src/app/auth/task.service';
import { ToasterService } from 'src/app/auth/toaster.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-popup',
  templateUrl: './task-popup.component.html',
  styleUrls: ['./task-popup.component.scss']
})
export class TaskPopupComponent implements OnInit {

  mode: string;
  sprintID: string;
  projID: string;
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
    private toaster: ToasterService, private router: Router, @Inject(MAT_DIALOG_DATA) data) {
      this.mode = data.mode;
      this.projID = data.projID;
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
    try {
      if (this.mode === 'create') {
        let id = await this.taskService.createTask(this.sprintID, this.model);
        id = id.replace(/"/g, '');
        this.router.navigate(['/projects/'+this.projID+'/tasks/'+id]);
        this.toaster.open('Successfully created the task!');
      }
      else {
        await this.taskService.updateTask(this.model._id, this.model);
        this.toaster.open('Successfully updated the task!');
      }
      this.dialogRef.close();
    } catch (error) {
      this.toaster.open(error.message);
      this.dialogRef.close();
    }
  }

}
