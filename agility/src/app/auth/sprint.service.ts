import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SprintService {

  private MOCK_SPRINTS: {_id: string, projID: string, header: string, due: Date, description: string}[] = [
    {
      _id: '1',
      projID: '1',
      header: 'This is a new sprint!',
      due: new Date('Tue Apr 23 2019 00:00:00 GMT-0400 (Eastern Daylight Time)'),
      description: 'We need to complete this sprint TODAY'
    },
    {
      _id: '2',
      projID: '1',
      header: 'This is a new sprint!',
      due: new Date('Tue Apr 23 2019 00:00:00 GMT-0400 (Eastern Daylight Time)'),
      description: 'We need to complete this sprint TODAY'
    },
    {
      _id: '3',
      projID: '1',
      header: 'This is a new sprint!',
      due: new Date('Tue Apr 23 2019 00:00:00 GMT-0400 (Eastern Daylight Time)'),
      description: 'We need to complete this sprint TODAY'
    },
    {
      _id: '4',
      projID: '1',
      header: 'This is a new sprint!',
      due: new Date('Tue Apr 23 2019 00:00:00 GMT-0400 (Eastern Daylight Time)'),
      description: 'We need to complete this sprint TODAY'
    }
  ]

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

  updateProjectSprint(projID: string, data) {

  }

  deleteProjectSprint(sprintID: string) {
    
  }
}
