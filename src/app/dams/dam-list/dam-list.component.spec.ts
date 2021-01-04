import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DamListComponent } from './dam-list.component';

describe('DamListComponent', () => {
  let component: DamListComponent;
  let fixture: ComponentFixture<DamListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DamListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DamListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
