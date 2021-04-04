import { TestBed, inject } from '@angular/core/testing';

import { TotoService } from './toto.service';

describe('TotoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TotoService]
    });
  });

  it('should be created', inject([TotoService], (service: TotoService) => {
    expect(service).toBeTruthy();
  }));
});
