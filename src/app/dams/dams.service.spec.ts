import { TestBed } from '@angular/core/testing';

import { DamsService } from './dams.service';

describe('DamsService', () => {
  let service: DamsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DamsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
