import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { ProjectService } from 'src/app/auth/project.service';

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
    @Inject(MAT_DIALOG_DATA) data) {
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
    if (this.mode === 'create') {
      this.projectService.createProject(this.model.name, this.model.description);
    }
    if (this.mode === 'update') {
      this.projectService.updateProject(this.model._id, this.model.name, this.model.description);
    }
    this.dialogRef.close();
  }

}
