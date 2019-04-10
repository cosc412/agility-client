import { Injectable } from '@angular/core';

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

  constructor() { }

  getProjects(userID: string) {
    return this.mock_projects;
  }

  getProject() {

  }

  createProject() {

  }

  updateProject() {

  }

  deleteProject() {
    
  }
}
