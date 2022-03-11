import { TestBed } from '@angular/core/testing';

import { RoleRepositoryService } from '../role-repository.service';

describe('RoleRepositoryService', () => {
  let service: RoleRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoleRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
