import { TestBed } from '@angular/core/testing';

import { PermissionRepositoryService } from '../permission-repository.service';

describe('PermissionRepositoryService', () => {
  let service: PermissionRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PermissionRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
