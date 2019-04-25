import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { TaskService } from 'src/app/auth/task.service';
import { ToasterService } from 'src/app/auth/toaster.service';

@Component({
  selector: 'app-details-popup',
  templateUrl: './details-popup.component.html',
  styleUrls: ['./details-popup.component.scss']
})
export class DetailsPopupComponent implements OnInit {

  mode: string;
  task: {
    _id: string,
    sprintID: string,
    due: Date,
    header: string,
    description: string,
    note: string[],
    block: string[]
  };
  model = {
    description: ''
  };

  constructor(private dialogRef: MatDialogRef<DetailsPopupComponent>, private taskService: TaskService,
    private toaster: ToasterService, @Inject(MAT_DIALOG_DATA) data) {
      this.mode = data.mode;
      this.task = data.task;
    }

  ngOnInit() {
  }

  cancel() {
    this.dialogRef.close();
  }

  async create() {
    try {
      if (this.mode === 'note') {
        const notes = this.task.note;
        notes.push(this.model.description);
        await this.taskService.addNote(this.task._id, notes);
        this.toaster.open('Successfully created the note!');
      }
      if (this.mode === 'block') {
        const blocks = this.task.block;
        blocks.push(this.model.description);
        await this.taskService.addBlock(this.task._id, blocks);
        this.toaster.open('Successfully created the block!');
      }
      this.dialogRef.close();
    } catch (error) {
      this.toaster.open(error.message);
      this.dialogRef.close();
    }
  }

}
