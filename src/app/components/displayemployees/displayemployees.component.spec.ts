import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayemployeesComponent } from './displayemployees.component';

describe('DisplayemployeesComponent', () => {
  let component: DisplayemployeesComponent;
  let fixture: ComponentFixture<DisplayemployeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayemployeesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayemployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
