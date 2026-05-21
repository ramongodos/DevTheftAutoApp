import { TestBed } from '@angular/core/testing';

import { Videojuego } from './videojuego';

describe('Videojuego', () => {
  let service: Videojuego;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Videojuego);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
