import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sprint-card',
  templateUrl: './sprint-card.component.html',
  styleUrls: ['./sprint-card.component.scss']
})
export class SprintCardComponent implements OnInit {

  @Input() sprint;

  constructor() { }

  ngOnInit() {
  }

  sprintClicked() {
    
  }

}
