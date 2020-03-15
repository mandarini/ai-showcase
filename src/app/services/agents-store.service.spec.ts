import { TestBed } from '@angular/core/testing';

import { AgentsStoreService } from './agents-store.service';

describe('AgentsStoreService', () => {
  let service: AgentsStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgentsStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
