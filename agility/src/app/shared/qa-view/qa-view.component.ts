import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-qa-view',
  templateUrl: './qa-view.component.html',
  styleUrls: ['./qa-view.component.scss']
})
export class QaViewComponent implements OnInit {

  @Input() question;
  expand = false;

  constructor() { }

  ngOnInit() {
  }

  expandMenu() {
    this.expand = !this.expand;
  }

}
