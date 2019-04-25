import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { ProjectService } from 'src/app/auth/project.service';
import { SprintService } from 'src/app/auth/sprint.service';
import { TaskService } from 'src/app/auth/task.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { ToasterService } from 'src/app/auth/toaster.service';

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
    private auth: AuthService, private toaster: ToasterService, @Inject(MAT_DIALOG_DATA) data) {
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
    try {
      if (this.mode === 'project') {
        await this.project.deleteProject(this.id);
        this.toaster.open('Successfully deleted the project!');
      }
      if (this.mode === 'sprint') {
        await this.sprint.deleteProjectSprint(this.id);
        this.toaster.open('Successfully deleted the sprint!');
      }
      if (this.mode === 'task') {
        await this.task.deleteTask(this.id);
        this.router.navigate([this.redirect]);
        this.toaster.open('Successfully deleted the task!');
      }
      if (this.mode === 'notes') {
        const updatedList = [];
        this.list.forEach(item => {
          if (item !== this.selected)
            updatedList.push(item);
        });
        await this.task.addNote(this.id, updatedList);
        this.toaster.open('Successfully deleted the note!');
      }
      if (this.mode === 'blocks') {
        const updatedList = [];
        this.list.forEach(item => {
          if (item !== this.selected)
            updatedList.push(item);
        });
        await this.task.addBlock(this.id, updatedList);
        this.toaster.open('Successfully deleted the block!');
      }
      if (this.mode === 'team') {
        await this.auth.removeUserFromProject(this.projID, this.id);
        this.toaster.open('Successfully removed the team member!');
      }
      this.dialogRef.close();
    } catch (error) {
      this.toaster.open(error.message, true);
      this.dialogRef.close();
    }
  }

}
