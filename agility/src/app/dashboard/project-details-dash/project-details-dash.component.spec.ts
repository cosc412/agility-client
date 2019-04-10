import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDetailsDashComponent } from './project-details-dash.component';

describe('ProjectDetailsDashComponent', () => {
  let component: ProjectDetailsDashComponent;
  let fixture: ComponentFixture<ProjectDetailsDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectDetailsDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDetailsDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
