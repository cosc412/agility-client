import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private mock_projects = [
    {
      _id: 1,
      name: `John Doe's Project`,
      description: 'This is a very descriptive project! This is a very descriptive project! This is a very descriptive project! This is a very descriptive project! This is a very descriptive project! This is a very descriptive project! This is a very descriptive project! This is a very descriptive project! This is a very descriptive project! This is a very descriptive project!'
    },
    {
      _id: 2,
      name: `Jane Doe's Project`,
      description: 'This is a very descriptive project!'
    },
    {
      _id: 3,
      name: `Emily Vogel's Project`,
      description: 'This is a very descriptive project!'
    },
    {
      _id: 4,
      name: `Cameron Crow's Project`,
      description: 'This is a very descriptive project!'
    },
    {
      _id: 5,
      name: `Sam Salas's Project`,
      description: 'This is a very descriptive project!'
    },
    {
      _id: 6,
      name: `Andrew Noonan's Project`,
      description: 'This is a very descriptive project!'
    }
  ]

  constructor(private http: HttpClient, private auth: AuthService, private router: Router) { }

  getProjects() {
    return this.mock_projects;
  }

  getProject(id: string) {
    return this.mock_projects[Number.parseInt(id) - 1];
  }

  createProject(name: string, description: string) {
    this.http.post('http://localhost:3000/projects',
    {
      name: name,
      description: description,
      userID: this.auth.user._id
    },
    {responseType: 'text'}).toPromise().then(project => {
      this.router.navigate(['/projects']);
    });
  }

  updateProject() {

  }

  deleteProject() {
    
  }
}
