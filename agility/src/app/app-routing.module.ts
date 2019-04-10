import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SplashComponent } from './home/splash/splash.component';
import { ProjectDashComponent } from './dashboard/project-dash/project-dash.component';
import { FaqPageComponent } from './home/faq-page/faq-page.component';
import { ProjectDetailsDashComponent } from './dashboard/project-details-dash/project-details-dash.component';

const routes: Routes = [
  { path: 'home', component: SplashComponent },
  { path:'faq', component: FaqPageComponent },
  { path: 'projects', component: ProjectDashComponent },
  { path: 'projects/:id', component: ProjectDetailsDashComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
