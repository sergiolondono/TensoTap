import { TestBed } from '@angular/core/testing';

import { CapturasUsuarioService } from './capturas-usuario.service';

describe('CapturasUsuarioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CapturasUsuarioService = TestBed.get(CapturasUsuarioService);
    expect(service).toBeTruthy();
  });
});
