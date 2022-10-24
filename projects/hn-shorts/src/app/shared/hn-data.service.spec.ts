import { TestBed } from '@angular/core/testing';

import { HnDataService } from './hn-data.service';

describe('HnDataService', () => {
  let service: HnDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HnDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
