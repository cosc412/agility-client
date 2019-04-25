import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {MatDialog} from "@angular/material";
import { SprintPopupComponent } from 'src/app/shared/sprint-popup/sprint-popup.component';
import { DeleteConfirmComponent } from 'src/app/shared/delete-confirm/delete-confirm.component';
import { ProjectService } from 'src/app/auth/project.service';

@Component({
  selector: 'app-sprint-card',
  templateUrl: './sprint-card.component.html',
  styleUrls: ['./sprint-card.component.scss']
})
export class SprintCardComponent implements OnInit {

  @Input() sprint;
  @Output() selected: EventEmitter<string> = new EventEmitter();
  @Output() changed: EventEmitter<boolean> = new EventEmitter();

  chosen = false;

  constructor(private projectService: ProjectService, private dialog: MatDialog) { }

  ngOnInit() {
  }

  sprintClicked() {
    this.chosen = !this.chosen;
    this.selected.emit(this.sprint._id);
  }

  unselect() {
    this.chosen = false;
  }

  editSprint() {
    const s = JSON.parse(JSON.stringify(this.sprint));
    const dialogRef = this.dialog.open(SprintPopupComponent, { panelClass: 'custom-container', data: { mode: 'update', params: s } });
    dialogRef.afterClosed().subscribe(val => {
      this.changed.emit(true);
    });
  }

  deleteSprint() {
    const dialogRef = this.dialog.open(DeleteConfirmComponent, { panelClass: 'custom-container', data: {
      mode: 'sprint',
      id: this.sprint._id }});
    dialogRef.afterClosed().subscribe(val => {
      this.changed.emit(true);
    });
  }

}
