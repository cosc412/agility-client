import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-task-list-view',
  templateUrl: './task-list-view.component.html',
  styleUrls: ['./task-list-view.component.scss']
})
export class TaskListViewComponent implements OnInit {

  @Input() task;

  constructor() { }

  ngOnInit() {
  }

}
