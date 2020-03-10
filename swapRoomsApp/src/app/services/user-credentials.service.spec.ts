import { TestBed } from '@angular/core/testing';

import { UserCredentialsService } from './user-credentials.service';

describe('UserCredentialsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserCredentialsService = TestBed.get(UserCredentialsService);
    expect(service).toBeTruthy();
  });
});
