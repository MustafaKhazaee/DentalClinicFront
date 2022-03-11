import { TestBed } from '@angular/core/testing';

import { VisitBoardService } from './visit-board.service';

describe('VisitBoardService', () => {
  let service: VisitBoardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisitBoardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
