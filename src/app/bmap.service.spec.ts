import { TestBed, inject } from '@angular/core/testing';

import { BmapService } from './bmap.service';

describe('BmapService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BmapService]
    });
  });

  it('should be created', inject([BmapService], (service: BmapService) => {
    expect(service).toBeTruthy();
  }));
});
