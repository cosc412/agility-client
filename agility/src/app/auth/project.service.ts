import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient, private auth: AuthService, private router: Router) { }

  getProjects() {
    return this.http.get('http://localhost:3000/projects', {headers: new HttpHeaders().set('userID', this.auth.user._id)}).toPromise();
  }

  getProject(id: string) {
    return this.http.get('http://localhost:3000/projects/'+id).toPromise();
  }

  createProject(name: string, description: string) {
    this.http.post('http://localhost:3000/projects',
    {
      name: name,
      description: description,
      userID: this.auth.user._id
    },
    {responseType: 'text'}).toPromise().then(project => {
      let navigate = '/projects/'+project;
      navigate = navigate.replace(/"/g, '');
      this.router.navigate([navigate]);
    });
  }

  updateProject(id: string, name: string, description: string) {
    return this.http.patch('http://localhost:3000/projects/'+id,
    {
      name: name,
      description: description
    });
  }

  deleteProject(id: string) {
    return this.http.delete('http://localhost:3000/projects/'+id).toPromise();
  }
}
