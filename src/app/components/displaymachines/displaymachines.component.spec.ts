import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaymachinesComponent } from './displaymachines.component';

describe('DisplaymachinesComponent', () => {
  let component: DisplaymachinesComponent;
  let fixture: ComponentFixture<DisplaymachinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplaymachinesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplaymachinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
