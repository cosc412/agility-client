import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintPopupComponent } from './sprint-popup.component';

describe('SprintPopupComponent', () => {
  let component: SprintPopupComponent;
  let fixture: ComponentFixture<SprintPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SprintPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
