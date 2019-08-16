import { TestBed } from '@angular/core/testing';

import { AprobarUsuariosService } from './aprobar-usuarios.service';

describe('AprobarUsuariosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AprobarUsuariosService = TestBed.get(AprobarUsuariosService);
    expect(service).toBeTruthy();
  });
});
