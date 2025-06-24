import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { firestoreGuard } from './firestore.guard';

describe('firestoreGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => firestoreGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
