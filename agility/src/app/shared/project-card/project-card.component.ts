import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent implements OnInit {

  @Input() project;
  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  clickEdit() {
    this.edit.emit(this.project);
  }

  clickDelete() {
    this.delete.emit(this.project._id);
  }

}
