import { TestBed } from '@angular/core/testing';

import { AppTextService } from './app-text.service';

describe('AppTextService', () => {
  let service: AppTextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppTextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
