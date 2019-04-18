import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatDialogModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopNavbarComponent } from './shared/top-navbar/top-navbar.component';
import { HomeComponent } from './home/home.component';
import { SplashComponent } from './home/splash/splash.component';
import { ProjectDashComponent } from './dashboard/project-dash/project-dash.component';
import { ProjectCardComponent } from './shared/project-card/project-card.component';
import { CreateProjectComponent } from './shared/create-project/create-project.component';
import { FaqPageComponent } from './home/faq-page/faq-page.component';
import { QaViewComponent } from './shared/qa-view/qa-view.component';
import { ProjectDetailsDashComponent } from './dashboard/project-details-dash/project-details-dash.component';
import { SprintCardComponent } from './shared/sprint-card/sprint-card.component';
import { TaskListViewComponent } from './shared/task-list-view/task-list-view.component';
import { TeamPageComponent } from './dashboard/project-details-dash/team-page/team-page.component';
import { TaskDetailsComponent } from './dashboard/project-details-dash/task-details/task-details.component';
import { PersonCardComponent } from './shared/person-card/person-card.component';

@NgModule({
  declarations: [
    AppComponent,
    TopNavbarComponent,
    HomeComponent,
    SplashComponent,
    ProjectDashComponent,
    ProjectCardComponent,
    CreateProjectComponent,
    FaqPageComponent,
    QaViewComponent,
    ProjectDetailsDashComponent,
    SprintCardComponent,
    TaskListViewComponent,
    TeamPageComponent,
    TaskDetailsComponent,
    PersonCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    CreateProjectComponent
  ]
})
export class AppModule { }
