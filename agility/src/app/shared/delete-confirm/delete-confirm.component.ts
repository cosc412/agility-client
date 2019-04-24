import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { ProjectService } from 'src/app/auth/project.service';
import { SprintService } from 'src/app/auth/sprint.service';
import { TaskService } from 'src/app/auth/task.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-delete-confirm',
  templateUrl: './delete-confirm.component.html',
  styleUrls: ['./delete-confirm.component.scss']
})
export class DeleteConfirmComponent implements OnInit {

  mode: string;
  id: string;
  redirect?: string;
  list?: string[];    // For notes/blocks, the whole array before selected value is taken out
  selected?: string;  // For notes/blocks, the selected value to delete
  projID?: string;    // For when removing a user from a project

  constructor(private dialogRef: MatDialogRef<DeleteConfirmComponent>, private project: ProjectService,
    private sprint: SprintService, private task: TaskService, private router: Router,
    private auth: AuthService, @Inject(MAT_DIALOG_DATA) data) {
      this.mode = data.mode;
      this.id = data.id;
      if (data.redirect) {
        this.redirect = data.redirect;
      }
      if (data.list && data.selected !== undefined) {
        this.list = data.list;
        this.selected = data.selected;
      }
      if (data.projID) {
        this.projID = data.projID;
      }
  }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

  async confirm() {
    if (this.mode === 'project') {
      await this.project.deleteProject(this.id);
    }
    if (this.mode === 'sprint') {
      await this.sprint.deleteProjectSprint(this.id);
    }
    if (this.mode === 'task') {
      await this.task.deleteTask(this.id);
      this.router.navigate([this.redirect]);
    }
    if (this.mode === 'notes') {
      const updatedList = [];
      this.list.forEach(item => {
        if (item !== this.selected)
          updatedList.push(item);
      });
      await this.task.addNote(this.id, updatedList);
    }
    if (this.mode === 'blocks') {
      const updatedList = [];
      this.list.forEach(item => {
        if (item !== this.selected)
          updatedList.push(item);
      });
      await this.task.addBlock(this.id, updatedList);
    }
    if (this.mode === 'team') {
      await this.auth.removeUserFromProject(this.projID, this.id);
    }
    this.dialogRef.close();
  }

}
