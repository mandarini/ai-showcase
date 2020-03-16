import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentComparisonComponent } from './agent-comparison.component';

describe('AgentComparisonComponent', () => {
  let component: AgentComparisonComponent;
  let fixture: ComponentFixture<AgentComparisonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentComparisonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
