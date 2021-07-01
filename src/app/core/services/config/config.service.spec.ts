import { TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';

import { of, throwError } from 'rxjs';

import { DEFAULT_APP_CONFIGURATION, IAppConfiguration } from '@core/services/config/config.model';

import testConfig from '@core/mocks/config.test.json';

import { ConfigService } from '@core/services/config/config.service';

describe('ConfigService', () : void => {
  let configService : ConfigService;

  const MOCK_HTTP_CLIENT : any = jasmine.createSpyObj('HttpClient', ['get']);

  // Asynchronous beforeEach()
  beforeEach(waitForAsync(() : void => {
    TestBed.configureTestingModule({
      providers : [ConfigService, { provide : HttpClient, useValue : MOCK_HTTP_CLIENT }]
    });
  }));

  // Synchronous beforeEach()
  beforeEach(() : void => {
    configService = TestBed.inject(ConfigService);
  });

  it('should be created', () : void => {
    expect(configService).toBeTruthy();
  });

  describe('function loadApplicationConfiguration()', () : void => {
    beforeEach(() : void => {
      MOCK_HTTP_CLIENT.get.calls.reset();
    });

    afterEach(() : void => {
      expect(MOCK_HTTP_CLIENT.get).toHaveBeenCalledTimes(1);
    });

    it('should load an application configuration into the service from an external JSON if provided', waitForAsync(() : void => {
      const NEW_CONFIGURATION : IAppConfiguration = testConfig as IAppConfiguration;

      MOCK_HTTP_CLIENT.get.and.returnValue(of(NEW_CONFIGURATION));

      configService.loadApplicationConfiguration('@core/mocks/config.test.json').then(() : void => {
        expect(ConfigService.internalAppConfiguration).toEqual(NEW_CONFIGURATION);
      });
    }));

    it('should load the development configuration JSON into the service when an external JSON is not provided', waitForAsync(() : void => {
      MOCK_HTTP_CLIENT.get.and.returnValue(of(DEFAULT_APP_CONFIGURATION));

      configService.loadApplicationConfiguration().then(() : void => {
        expect(ConfigService.internalAppConfiguration).toEqual(DEFAULT_APP_CONFIGURATION);
      });
    }));

    it('should load the default configuration JSON into the service when the HTTP Client fails to retrieve the configuration', waitForAsync(() : void => {
      MOCK_HTTP_CLIENT.get.and.returnValue(throwError(() : Error => {
        return { name : 'Error', message : 'Succeeded At Failing' };
      }));

      configService.loadApplicationConfiguration().then(undefined, () : void => {
        expect(ConfigService.internalAppConfiguration).toEqual(DEFAULT_APP_CONFIGURATION);
      });
    }));
  });
});
