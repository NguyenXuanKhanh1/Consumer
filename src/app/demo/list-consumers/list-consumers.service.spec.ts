import { TestBed } from '@angular/core/testing';

import { ListConsumersService } from './list-consumers.service';

describe('ListConsumersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListConsumersService = TestBed.get(ListConsumersService);
    expect(service).toBeTruthy();
  });
});
