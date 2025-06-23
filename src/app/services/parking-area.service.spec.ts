import { TestBed } from '@angular/core/testing';

import { ParkingAreaService } from './parking-area.service';

describe('ParkingAreaService', () => {
  let service: ParkingAreaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParkingAreaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
