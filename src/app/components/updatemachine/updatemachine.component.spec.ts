import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatemachineComponent } from './updatemachine.component';

describe('UpdatemachineComponent', () => {
  let component: UpdatemachineComponent;
  let fixture: ComponentFixture<UpdatemachineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatemachineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatemachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
