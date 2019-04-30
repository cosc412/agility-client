import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { ToasterService } from 'src/app/auth/toaster.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  projectRole: string;

  constructor(private http: HttpClient, private auth: AuthService, private router: Router, private toaster: ToasterService) { }

  getProjects() {
    return this.http.get('https://agility-api.herokuapp.com/projects', {
      headers: new HttpHeaders().set('authorization', this.auth.getUserToken())
    }).toPromise();
  }

  getProject(id: string) {
    return this.http.get('https://agility-api.herokuapp.com/projects/'+id, {
      headers: new HttpHeaders().set('authorization', this.auth.getUserToken())
    }).toPromise();
  }

  createProject(name: string, description: string) {
    this.http.post('https://agility-api.herokuapp.com/projects',
    {
      name: name,
      description: description,
      userID: this.auth.user._id
    }, {
      headers: new HttpHeaders().set('authorization', this.auth.getUserToken())
    }).toPromise().then(project => {
      let navigate = '/projects/'+project;
      navigate = navigate.replace(/"/g, '');
      this.router.navigate([navigate]);
    }).catch((error: Error) => this.toaster.open(error.message, true));
  }

  updateProject(id: string, name: string, description: string) {
    this.http.patch('https://agility-api.herokuapp.com/projects/'+id,
    {
      name: name,
      description: description
    }, {
      headers: new HttpHeaders().set('authorization', this.auth.getUserToken())
    }).toPromise();
  }

  deleteProject(id: string) {
    return this.http.delete('https://agility-api.herokuapp.com/projects/'+id, {
      headers: new HttpHeaders().set('authorization', this.auth.getUserToken())
    }).toPromise();
  }
}
