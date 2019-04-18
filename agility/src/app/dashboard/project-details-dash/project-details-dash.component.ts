import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NavbarService } from 'src/app/auth/navbar.service';
import { ProjectService } from 'src/app/auth/project.service';
import { SprintService } from 'src/app/auth/sprint.service';
import { ActivatedRoute } from '@angular/router';

import { SprintCardComponent } from '../../shared/sprint-card/sprint-card.component';
import { TaskService } from 'src/app/auth/task.service';

@Component({
  selector: 'app-project-details-dash',
  templateUrl: './project-details-dash.component.html',
  styleUrls: ['./project-details-dash.component.scss']
})
export class ProjectDetailsDashComponent implements OnInit {

  @ViewChildren('sprintCards') components:QueryList<SprintCardComponent>;

  project;
  sprints: any[];
  tasks: any[];

  selectedSprint: string;
  selectedSprintHeader: string;

  constructor(private navbarService: NavbarService, private projectService: ProjectService,
    private sprintService: SprintService, private taskService: TaskService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.navbarService.isInDetailsDash = true;
    this.route.params.subscribe(params => {
      if (params.id) {
        this.project = this.projectService.getProject(params.id);
        this.navbarService.projectName = this.project.name;
        this.navbarService.projectID = params.id;
        this.sprints = this.sprintService.getProjectSprints(params.id);
      }
    });
  }

  getSprintTasks(sprintID: string) {
    // Tell the previous sprint card, if any to be unselected then assign the new sprint
    if (this.selectedSprint !== sprintID) {
      this.components.forEach(val => {
        if (sprintID !== val.sprint._id) {
          val.unselect();
        }
      });
      this.selectedSprint = sprintID;
      this.selectedSprintHeader = this.sprints.find(sprint => {
        return sprint._id === this.selectedSprint;
      }).header;
      // Get the tasks of the sprint selected
      this.tasks = this.taskService.getTasksBySprint(this.selectedSprint);
    } else {
      this.selectedSprint = undefined;
      this.selectedSprintHeader = undefined;
      this.tasks = [];
    }
  }

}
