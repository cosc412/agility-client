import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material";
import { ProjectService } from 'src/app/auth/project.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {

  data = {
    name: '',
    description: ''
  }

  constructor(private dialogRef: MatDialogRef<CreateProjectComponent>, private projectService: ProjectService) { }

  ngOnInit() { }

  close() {
    this.dialogRef.close();
  }

  async create() {
    this.projectService.createProject();
    this.dialogRef.close();
  }

}
