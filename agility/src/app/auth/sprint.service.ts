import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SprintService {

  constructor(private http: HttpClient) { }

  getProjectSprints(projID: string) {
    return this.http.get('http://localhost:3000/sprints', {headers: new HttpHeaders().set('projectID', projID)}).toPromise();
  }

  createProjectSprint(projID: string, data: {header: string, due: Date, description: string}) {
    this.http.post('http://localhost:3000/sprints', {
      projID: projID,
      header: data.header,
      due: data.due.toUTCString(),
      description: data.description
    },
    {responseType: 'text'}).toPromise();
  }

  updateProjectSprint(sID: string, data: {projID: string, header: string, due: Date, description: string}) {
    this.http.patch('http://localhost:3000/sprints/'+sID, {
      projID: data.projID,
      header: data.header,
      due: data.due,
      description: data.description
    },
    {responseType: 'text'}).toPromise();
  }

  deleteProjectSprint(sprintID: string) {
    
  }
}
