import { TestBed, waitForAsync } from '@angular/core/testing';

import allUsers from '@core/mocks/all-users.json';

import { InMemoryDataService } from '@core/services/in-memory-data/in-memory-data.service';

describe('InMemoryDataService', () : void => {
  let inMemoryDataService : InMemoryDataService;

  // Asynchronous beforeEach()
  beforeEach(waitForAsync(() : void => {
    TestBed.configureTestingModule({
      providers : [InMemoryDataService]
    });
  }));

  // Synchronous beforeEach()
  beforeEach(() : void => {
    inMemoryDataService = TestBed.inject(InMemoryDataService);

    expect(inMemoryDataService['_allUsers']).toEqual(allUsers);
  });

  it('should be created', () : void => {
    expect(inMemoryDataService).toBeTruthy();
  });

  describe('function createDb', () : void => {
    it('should return an object defining the structure of the in-memory database', () : void => {
      expect(inMemoryDataService.createDb()).toBeDefined();
    });
  });
});
