import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  constructor(private http: HttpClient) { }

  getTasksBySprint(sprintID: string) {
    return this.http.get('http://localhost:3000/tasks', {headers: new HttpHeaders().set('sprintID', sprintID)}).toPromise();
  }

  getTaskByID(taskID: string) {
    return this.http.get('http://localhost:3000/tasks/'+taskID, {responseType: 'text'}).toPromise();
  }

  createTask() {

  }

  updateTask() {

  }

  deleteTask() {
    
  }

  addNote() {

  }

  addBlock() {
    
  }
}
