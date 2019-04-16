import { Component, OnInit, Input } from '@angular/core';
import { NavbarService } from 'src/app/auth/navbar.service';

@Component({
  selector: 'app-task-list-view',
  templateUrl: './task-list-view.component.html',
  styleUrls: ['./task-list-view.component.scss']
})
export class TaskListViewComponent implements OnInit {

  @Input() task;

  constructor(private navbarService: NavbarService) { }

  ngOnInit() {
  }

}
