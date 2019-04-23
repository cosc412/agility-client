import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { SprintService } from 'src/app/auth/sprint.service';

@Component({
  selector: 'app-sprint-popup',
  templateUrl: './sprint-popup.component.html',
  styleUrls: ['./sprint-popup.component.scss']
})
export class SprintPopupComponent implements OnInit {

  mode: string;
  projID: string;
  model = {
    _id: '',
    projID: '',
    header: '',
    due: new Date(),
    description: ''
  };

  constructor(private dialogRef: MatDialogRef<SprintPopupComponent>, private sprintService: SprintService,
    @Inject(MAT_DIALOG_DATA) data) {
      this.mode = data.mode;
      this.projID = data.projID;
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
    if (this.mode === 'create') {
      this.sprintService.createProjectSprint(this.projID, this.model);
    }
    else {
      this.sprintService.updateProjectSprint(this.model._id, this.model);
    }
    this.dialogRef.close();
  }

}
