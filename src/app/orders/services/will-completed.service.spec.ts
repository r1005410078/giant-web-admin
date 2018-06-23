import { TestBed, inject } from '@angular/core/testing';

import { WillCompletedService } from './will-completed.service';

describe('WillCompletedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WillCompletedService]
    });
  });

  it('should be created', inject([WillCompletedService], (service: WillCompletedService) => {
    expect(service).toBeTruthy();
  }));
});
