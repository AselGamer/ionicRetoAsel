import { TestBed } from '@angular/core/testing';

import { RetoserviceService } from './retoservice.service';

describe('RetoserviceService', () => {
  let service: RetoserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RetoserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
