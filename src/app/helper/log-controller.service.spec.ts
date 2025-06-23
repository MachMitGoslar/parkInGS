import { TestBed } from '@angular/core/testing';

import { LogControllerService } from './log-controller.service';

describe('LogControllerService', () => {
  let service: LogControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
