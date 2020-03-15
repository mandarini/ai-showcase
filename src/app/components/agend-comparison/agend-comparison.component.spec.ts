import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendComparisonComponent } from './agend-comparison.component';

describe('AgendComparisonComponent', () => {
  let component: AgendComparisonComponent;
  let fixture: ComponentFixture<AgendComparisonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgendComparisonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
