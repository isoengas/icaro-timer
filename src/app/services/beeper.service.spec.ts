import { TestBed, inject } from '@angular/core/testing';

import { BeeperService } from './beeper.service';

describe('BeeperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BeeperService]
    });
  });

  it('should be created', inject([BeeperService], (service: BeeperService) => {
    expect(service).toBeTruthy();
  }));
});
