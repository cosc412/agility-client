import { Injectable } from '@angular/core';

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

  constructor() { }

  getProjectSprints(projID: string) {
    return this.MOCK_SPRINTS.filter(val => {
      return val.projID === projID;
    });
  }

  createProjectSprint(projID: string, data) {

  }

  updateProjectSprint(projID: string, data) {

  }

  deleteProjectSprint(sprintID: string) {
    
  }
}
