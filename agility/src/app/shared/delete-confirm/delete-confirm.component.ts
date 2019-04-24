import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { ProjectService } from 'src/app/auth/project.service';
import { SprintService } from 'src/app/auth/sprint.service';
import { TaskService } from 'src/app/auth/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-confirm',
  templateUrl: './delete-confirm.component.html',
  styleUrls: ['./delete-confirm.component.scss']
})
export class DeleteConfirmComponent implements OnInit {

  mode: string;
  id: string;
  redirect?: string;

  constructor(private dialogRef: MatDialogRef<DeleteConfirmComponent>, private project: ProjectService,
    private sprint: SprintService, private task: TaskService, private router: Router, @Inject(MAT_DIALOG_DATA) data) {
      this.mode = data.mode;
      this.id = data.id;
      if (data.redirect) {
        this.redirect = data.redirect;
      }
  }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

  async confirm() {
    if (this.mode === 'project') {
      this.project.deleteProject(this.id).then(() => this.dialogRef.close());
    }
    if (this.mode === 'sprint') {
      this.sprint.deleteProjectSprint(this.id).then(() => this.dialogRef.close());
    }
    if (this.mode === 'task') {
      this.task.deleteTask(this.id).then(() => {
        this.router.navigate([this.redirect]);
        this.dialogRef.close();
      });
    }
  }

}
