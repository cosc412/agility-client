import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { NavbarService } from './navbar.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient, private auth: AuthService, private navbar: NavbarService) { }

  getTasksBySprint(sprintID: string) {
    return this.http.get('https://ancient-stream-54187.herokuapp.com/tasks', {
      headers: new HttpHeaders().set('sprintID', sprintID)
      .set('projectid', this.navbar.projectID)
      .set('authorization', this.auth.getUserToken())
    }).toPromise();
  }

  getTaskByID(taskID: string) {
    return this.http.get('https://ancient-stream-54187.herokuapp.com/tasks/'+taskID, {
      headers: new HttpHeaders().set('projectid', this.navbar.projectID)
      .set('authorization', this.auth.getUserToken())
    }).toPromise();
  }

  createTask(sprintID: string, params: {due: Date, header: string, description: string}) {
    return this.http.post('https://ancient-stream-54187.herokuapp.com/tasks', {
      sprintID: sprintID,
      due: params.due.toUTCString(),
      header: params.header,
      description: params.description,
      projectID: this.navbar.projectID
    }, {
      responseType: 'text',
      headers: new HttpHeaders().set('projectid', this.navbar.projectID)
      .set('authorization', this.auth.getUserToken())
    }).toPromise();
  }

  updateTask(taskID: string, params: {sprintID: string, due: Date, header: string, description: string, block: string[], note: string[]}) {
    return this.http.patch('https://ancient-stream-54187.herokuapp.com/tasks/'+taskID, {
      sprintID: params.sprintID,
      due: params.due,
      header: params.header,
      description: params.description,
      block: params.block,
      note: params.note
    }, {
      headers: new HttpHeaders().set('projectid', this.navbar.projectID)
      .set('authorization', this.auth.getUserToken())
    }).toPromise();
  }

  deleteTask(taskID: string) {
    return this.http.delete('https://ancient-stream-54187.herokuapp.com/tasks/'+taskID, {
      headers: new HttpHeaders().set('projectid', this.navbar.projectID)
      .set('authorization', this.auth.getUserToken())
    }).toPromise();
  }

  addNote(taskID: string, notes: string[]) {
    return this.http.post('https://ancient-stream-54187.herokuapp.com/tasks/'+taskID+'/notes', {
      notes: notes
    }, {
      headers: new HttpHeaders().set('projectid', this.navbar.projectID)
      .set('authorization', this.auth.getUserToken())
    }).toPromise();
  }

  addBlock(taskID: string, blocks: string[]) {
    return this.http.post('https://ancient-stream-54187.herokuapp.com/tasks/'+taskID+'/blocks', {
      blocks: blocks
    }, {
      headers: new HttpHeaders().set('projectid', this.navbar.projectID)
      .set('authorization', this.auth.getUserToken())
    }).toPromise();
  }
}
