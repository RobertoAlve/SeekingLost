import { TestBed } from '@angular/core/testing';

import { LostPersonService } from './lost-person.service';

describe('LostPersonService', () => {
  let service: LostPersonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LostPersonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
