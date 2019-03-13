import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SplashComponent } from './home/splash/splash.component';

const routes: Routes = [
  { path: 'home', component: SplashComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
