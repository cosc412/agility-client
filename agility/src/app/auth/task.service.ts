import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private MOCK_TASKS: {_id: string, sprintID: string, due: string, header: string, description: string, note: string[], block: string[]}[] = [
    {
      _id: '1',
      sprintID: '1',
      due: '4/10/19',
      header: 'This is a new task!',
      description: 'We need to finish this up within the hour.',
      note: ['This is a note!'],
      block: ['This is a block!']
    },
    {
      _id: '2',
      sprintID: '1',
      due: '4/10/19',
      header: 'This is a new task!',
      description: 'We need to finish this up within the hour.',
      note: ['This is a note!'],
      block: ['This is a block!']
    }
  ];

  constructor() { }

  getTasksBySprint(sprintID: string) {
    return this.MOCK_TASKS.filter(task => {
      return task.sprintID === sprintID;
    });
  }
}
