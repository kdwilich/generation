import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DamDetailComponent } from './dam-detail.component';

describe('DamDetailComponent', () => {
  let component: DamDetailComponent;
  let fixture: ComponentFixture<DamDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DamDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DamDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
