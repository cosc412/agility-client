import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SprintService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  getProjectSprints(projID: string) {
    return this.http.get('https://agility-api.herokuapp.com/sprints', {
      headers: new HttpHeaders().set('projectID', projID)
      .set('authorization', this.auth.getUserToken())}).toPromise();
  }

  createProjectSprint(projID: string, data: {header: string, due: Date, description: string}) {
    this.http.post('https://agility-api.herokuapp.com/sprints', {
      projID: projID,
      header: data.header,
      due: data.due.toUTCString(),
      description: data.description
    }, {
      headers: new HttpHeaders().set('authorization', this.auth.getUserToken())
    }).toPromise();
  }

  updateProjectSprint(sID: string, data: {projID: string, header: string, due: Date, description: string}) {
    this.http.patch('https://agility-api.herokuapp.com/sprints/'+sID, {
      projID: data.projID,
      header: data.header,
      due: data.due,
      description: data.description
    }, {
      headers: new HttpHeaders().set('authorization', this.auth.getUserToken())
    }).toPromise();
  }

  deleteProjectSprint(sprintID: string) {
    return this.http.delete('https://agility-api.herokuapp.com/sprints/'+sprintID,
    {
      headers: new HttpHeaders().set('authorization', this.auth.getUserToken())
    }).toPromise();
  }
}
