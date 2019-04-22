import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private MOCK_TASKS: {_id: string, sprintID: string, due: Date, header: string, description: string, note: string[], block: string[]}[] = [
    {
      _id: '1',
      sprintID: '1',
      due: new Date('Tue Apr 23 2019 00:00:00 GMT-0400 (Eastern Daylight Time)'),
      header: 'This is a new task!',
      description: 'We need to finish this up within the hour.',
      note: ['This is a note!'],
      block: []
    },
    {
      _id: '2',
      sprintID: '1',
      due: new Date('Tue Apr 23 2019 00:00:00 GMT-0400 (Eastern Daylight Time)'),
      header: 'This is a new task!',
      description: 'We need to finish this up within the hour.',
      note: ['This is a note!'],
      block: ['This is a block!']
    },
    {
      _id: '3',
      sprintID: '2',
      due: new Date('Tue Apr 23 2019 00:00:00 GMT-0400 (Eastern Daylight Time)'),
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

  getTaskByID(taskID: string) {
    return this.MOCK_TASKS.find(task => {
      return task._id === taskID;
    })
  }

  createTask() {

  }

  updateTask() {

  }

  deleteTask() {
    
  }
}
