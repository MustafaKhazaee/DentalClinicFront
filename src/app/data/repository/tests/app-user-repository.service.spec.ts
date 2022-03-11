import { TestBed } from '@angular/core/testing';

import { AppUserRepositoryService } from '../app-user-repository.service';

describe('AppUserRepositoryService', () => {
  let service: AppUserRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppUserRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
