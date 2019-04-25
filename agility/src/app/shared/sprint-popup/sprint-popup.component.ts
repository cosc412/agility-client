import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { SprintService } from 'src/app/auth/sprint.service';
import { ToasterService } from 'src/app/auth/toaster.service';

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
    private toaster: ToasterService, @Inject(MAT_DIALOG_DATA) data) {
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
    try {
      if (this.mode === 'create') {
        await this.sprintService.createProjectSprint(this.projID, this.model);
        this.toaster.open('Successfully created the sprint!');
      }
      else {
        await this.sprintService.updateProjectSprint(this.model._id, this.model);
        this.toaster.open('Successfully updated the sprint!');
      }
      this.dialogRef.close();
    } catch (error) {
      this.toaster.open(error.message, true);
      this.dialogRef.close();
    }
  }

}
