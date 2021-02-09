import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerationScheduleComponent } from './generation-schedule.component';

describe('GenerationScheduleComponent', () => {
  let component: GenerationScheduleComponent;
  let fixture: ComponentFixture<GenerationScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerationScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerationScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
