import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from 'src/app/auth/task.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit {

  task;
  descriptionClick = false;

  constructor(private route: ActivatedRoute, private taskService: TaskService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.taskID) {
        this.task = this.taskService.getTaskByID(params.taskID);
      }
    });
  }

}
