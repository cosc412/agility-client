import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sprint-card',
  templateUrl: './sprint-card.component.html',
  styleUrls: ['./sprint-card.component.scss']
})
export class SprintCardComponent implements OnInit {

  @Input() sprint;
  @Output() selected: EventEmitter<string> = new EventEmitter();

  chosen = false;

  constructor() { }

  ngOnInit() {
  }

  sprintClicked() {
    this.chosen = !this.chosen;
    this.selected.emit(this.sprint._id);
  }

}
