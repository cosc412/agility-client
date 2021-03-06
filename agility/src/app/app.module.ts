import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatDialogModule, MatDatepickerModule, MatNativeDateModule, MatSnackBarModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { TopNavbarComponent } from './shared/top-navbar/top-navbar.component';
import { HomeComponent } from './home/home.component';
import { SplashComponent } from './home/splash/splash.component';
import { ProjectDashComponent } from './dashboard/project-dash/project-dash.component';
import { ProjectCardComponent } from './shared/project-card/project-card.component';
import { ProjectPopupComponent } from './shared/project-popup/project-popup.component';
import { FaqPageComponent } from './home/faq-page/faq-page.component';
import { QaViewComponent } from './shared/qa-view/qa-view.component';
import { ProjectDetailsDashComponent } from './dashboard/project-details-dash/project-details-dash.component';
import { SprintCardComponent } from './shared/sprint-card/sprint-card.component';
import { TaskListViewComponent } from './shared/task-list-view/task-list-view.component';
import { TeamPageComponent } from './dashboard/project-details-dash/team-page/team-page.component';
import { TaskDetailsComponent } from './dashboard/project-details-dash/task-details/task-details.component';
import { PersonCardComponent } from './shared/person-card/person-card.component';
import { DeleteConfirmComponent } from './shared/delete-confirm/delete-confirm.component';
import { SprintPopupComponent } from './shared/sprint-popup/sprint-popup.component';
import { TaskPopupComponent } from './shared/task-popup/task-popup.component';
import { DetailsPopupComponent } from './shared/details-popup/details-popup.component';
import { UserPopupComponent } from './shared/user-popup/user-popup.component';
import { ProjectGuard } from './guards/project.guard';

@NgModule({
  declarations: [
    AppComponent,
    TopNavbarComponent,
    HomeComponent,
    SplashComponent,
    ProjectDashComponent,
    ProjectCardComponent,
    ProjectPopupComponent,
    FaqPageComponent,
    QaViewComponent,
    ProjectDetailsDashComponent,
    SprintCardComponent,
    TaskListViewComponent,
    TeamPageComponent,
    TaskDetailsComponent,
    PersonCardComponent,
    DeleteConfirmComponent,
    SprintPopupComponent,
    TaskPopupComponent,
    DetailsPopupComponent,
    UserPopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule
  ],
  providers: [ProjectGuard],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    ProjectPopupComponent,
    DeleteConfirmComponent,
    TaskPopupComponent,
    SprintPopupComponent,
    DetailsPopupComponent,
    UserPopupComponent
  ]
})
export class AppModule { }
