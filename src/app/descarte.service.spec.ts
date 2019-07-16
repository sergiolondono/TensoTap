import { TestBed } from '@angular/core/testing';

import { DescarteService } from './descarte.service';

describe('DescarteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DescarteService = TestBed.get(DescarteService);
    expect(service).toBeTruthy();
  });
});
