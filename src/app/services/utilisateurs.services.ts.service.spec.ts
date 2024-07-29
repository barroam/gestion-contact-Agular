import { TestBed } from '@angular/core/testing';

import { UtilisateursServicesTsService } from './utilisateurs.services.ts.service';

describe('UtilisateursServicesTsService', () => {
  let service: UtilisateursServicesTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilisateursServicesTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
