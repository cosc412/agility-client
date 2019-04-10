import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SprintService {

  private MOCK_SPRINTS: {_id: string, projID: string, header: string, due: string, description: string}[] = [
    {
      _id: '1',
      projID: '1',
      header: 'This is a new sprint!',
      due: '4/10/2019',
      description: 'We need to complete this sprint TODAY'
    },
    {
      _id: '2',
      projID: '1',
      header: 'This is a new sprint!',
      due: '4/10/2019',
      description: 'We need to complete this sprint TODAY'
    },
    {
      _id: '3',
      projID: '1',
      header: 'This is a new sprint!',
      due: '4/10/2019',
      description: 'We need to complete this sprint TODAY'
    },
    {
      _id: '4',
      projID: '1',
      header: 'This is a new sprint!',
      due: '4/10/2019',
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
