import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NavbarService } from 'src/app/auth/navbar.service';
import { ProjectService } from 'src/app/auth/project.service';
import { SprintService } from 'src/app/auth/sprint.service';
import { ActivatedRoute } from '@angular/router';
import {MatDialog} from "@angular/material";
import { SprintCardComponent } from '../../shared/sprint-card/sprint-card.component';
import { TaskService } from 'src/app/auth/task.service';
import { SprintPopupComponent } from 'src/app/shared/sprint-popup/sprint-popup.component';
import { TaskPopupComponent } from 'src/app/shared/task-popup/task-popup.component';

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
    private sprintService: SprintService, private taskService: TaskService, private route: ActivatedRoute,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.navbarService.isInDetailsDash = true;
    this.route.params.subscribe(params => {
      if (params.id) {
        this.projectService.getProject(params.id).then(p => {
          this.project = p;
          this.navbarService.projectName = this.project.name;
          this.navbarService.projectID = params.id;
          this.sprints = this.sprintService.getProjectSprints(params.id);
        });
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

  createSprint() {
    this.dialog.open(SprintPopupComponent, { panelClass: 'custom-container', data: { mode: 'create' } });
  }

  createTask() {
    this.dialog.open(TaskPopupComponent, { panelClass: 'custom-container', data: { mode: 'create' } });
  }

}
