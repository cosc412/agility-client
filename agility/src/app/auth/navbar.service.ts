import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  isInDetailsDash = false;
  projectName: string;
  projectID: string;

  constructor() { }
}
