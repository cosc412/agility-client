import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  getTasksBySprint(sprintID: string) {
    return this.http.get('http://localhost:3000/tasks', {headers: new HttpHeaders().set('sprintID', sprintID)}).toPromise();
  }

  getTaskByID(taskID: string) {
    return this.http.get('http://localhost:3000/tasks/'+taskID, {responseType: 'text'}).toPromise();
  }

  createTask(sprintID: string, params: {due: Date, header: string, description: string}) {
    return this.http.post('http://localhost:3000/tasks', {
      sprintID: sprintID,
      due: params.due.toUTCString(),
      header: params.header,
      description: params.description
    }, {responseType: 'text'}).toPromise();
  }

  updateTask(taskID: string, params: {sprintID: string, due: Date, header: string, description: string, block: string[], note: string[]}) {
    return this.http.patch('http://localhost:3000/tasks/'+taskID, {
      sprintID: params.sprintID,
      due: params.due,
      header: params.header,
      description: params.description,
      block: params.block,
      note: params.note
    }, {responseType: 'text'}).toPromise();
  }

  deleteTask() {
    
  }

  addNote() {

  }

  addBlock() {
    
  }
}
