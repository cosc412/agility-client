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
import { AuthService } from 'src/app/auth/auth.service';

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
    private sprintService: SprintService, private taskService: TaskService, private auth: AuthService,
    private route: ActivatedRoute, private dialog: MatDialog) { }

  ngOnInit() {
    this.navbarService.isInDetailsDash = true;
    this.route.params.subscribe(params => {
      if (params.id) {
        this.projectService.getProject(params.id).then(p => {
          this.project = p;
          this.navbarService.projectName = this.project.name;
          this.navbarService.projectID = params.id;
          this.auth.getMyProjectRole(params.id).then((role: any) => {
            this.projectService.projectRole = JSON.parse(role).role;
          });
          this.sprintService.getProjectSprints(this.project._id).then((sprints: any[]) => {
            this.sprints = sprints;
          });
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
      this.taskService.getTasksBySprint(this.selectedSprint).then((tasks: any[]) => {
        this.tasks = tasks;
      });
    } else {
      this.selectedSprint = undefined;
      this.selectedSprintHeader = undefined;
      this.tasks = undefined;
    }
  }

  createSprint() {
    this.dialog.open(SprintPopupComponent, { panelClass: 'custom-container', data: { mode: 'create', projID: this.project._id } });
  }

  createTask() {
    this.dialog.open(TaskPopupComponent, { panelClass: 'custom-container', data: { mode: 'create', sprintID: this.selectedSprint } });
  }

}
