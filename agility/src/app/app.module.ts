import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatDialogModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

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
    ProjectDetailsDashComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    BrowserAnimationsModule
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
