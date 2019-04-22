import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {MatDialog} from "@angular/material";
import { SprintPopupComponent } from 'src/app/shared/sprint-popup/sprint-popup.component';
import { DeleteConfirmComponent } from 'src/app/shared/delete-confirm/delete-confirm.component';

@Component({
  selector: 'app-sprint-card',
  templateUrl: './sprint-card.component.html',
  styleUrls: ['./sprint-card.component.scss']
})
export class SprintCardComponent implements OnInit {

  @Input() sprint;
  @Output() selected: EventEmitter<string> = new EventEmitter();

  chosen = false;

  constructor(private dialog: MatDialog) { }

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
    this.dialog.open(SprintPopupComponent, { panelClass: 'custom-container' });
  }

  deleteSprint() {
    this.dialog.open(DeleteConfirmComponent, { panelClass: 'custom-container' });
  }

}
