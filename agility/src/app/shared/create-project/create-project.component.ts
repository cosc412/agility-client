import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { ProjectService } from 'src/app/auth/project.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {

  mode: string; // i.e. 'create' or 'update'

  model = {
    name: '',
    description: ''
  }

  constructor(private dialogRef: MatDialogRef<CreateProjectComponent>, private projectService: ProjectService,
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
      this.projectService.createProject();
    }
    else {

    }
    this.dialogRef.close();
  }

}
