import { TestBed } from '@angular/core/testing';

import { VisitRepositoryService } from '../visit-repository.service';

describe('VisitRepositoryService', () => {
  let service: VisitRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisitRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
