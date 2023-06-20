import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimetableServiceComponent } from './timetable.service.component';

describe('TimetableServiceComponent', () => {
  let component: TimetableServiceComponent;
  let fixture: ComponentFixture<TimetableServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimetableServiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimetableServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
