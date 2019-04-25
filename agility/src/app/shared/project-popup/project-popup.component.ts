import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { ProjectService } from 'src/app/auth/project.service';
import { ToasterService } from 'src/app/auth/toaster.service';

@Component({
  selector: 'app-project-popup',
  templateUrl: './project-popup.component.html',
  styleUrls: ['./project-popup.component.scss']
})
export class ProjectPopupComponent implements OnInit {

  mode: string; // i.e. 'create' or 'update'

  model = {
    _id: '',
    name: '',
    description: ''
  }

  constructor(private dialogRef: MatDialogRef<ProjectPopupComponent>, private projectService: ProjectService,
    private toaster: ToasterService, @Inject(MAT_DIALOG_DATA) data) {
      this.mode = data.mode;
      if (this.mode === 'update') {
        this.model = data.params;
      }
    }

  ngOnInit() { }

  close() {
    this.dialogRef.close();
  }

  async create() {
    try {
      if (this.mode === 'create') {
        await this.projectService.createProject(this.model.name, this.model.description);
        this.toaster.open('Successfully created the project!');
      }
      if (this.mode === 'update') {
        await this.projectService.updateProject(this.model._id, this.model.name, this.model.description);
        this.toaster.open('Successfully updated the project!');
      }
      this.dialogRef.close();
    } catch (error) {
      this.toaster.open(error.message, true);
      this.dialogRef.close();
    }
  }

}
