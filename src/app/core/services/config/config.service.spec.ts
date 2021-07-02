import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';

import { APP_CONSTANTS, DEFAULT_APP_CONFIGURATION, IAppConfiguration } from '@core/services/config/config.model';
import { ENVIRONMENT } from '@environment/environment.development';

import developmentConfig from '@assets/config/config.development.json';
import testConfig from '@core/mocks/config.test.json';

import { ConfigService } from '@core/services/config/config.service';

describe('ConfigService', () : void => {
  let configService : ConfigService;
  let httpMock : HttpTestingController;

  // Asynchronous beforeEach()
  beforeEach(waitForAsync(() : void => {
    TestBed.configureTestingModule({
      imports : [HttpClientTestingModule],
      providers : [ConfigService]
    });
  }));

  // Synchronous beforeEach()
  beforeEach(() : void => {
    configService = TestBed.inject(ConfigService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() : void => {
    httpMock.verify();
  });

  it('should be created', () : void => {
    expect(configService).toBeTruthy();
  });

  describe('function loadApplicationConfiguration()', () : void => {
    it('should load an application configuration into the service from an external JSON if a config was specified', () : void => {
      const NEW_CONFIGURATION_URI : string = '@core/mocks/config.test.json';

      const APPLICATION_LOAD_PROMISE : Promise<void> = configService.loadApplicationConfiguration(NEW_CONFIGURATION_URI);

      const APP_CONFIGURATION_REQUEST : TestRequest = httpMock.expectOne(NEW_CONFIGURATION_URI);
      expect(APP_CONFIGURATION_REQUEST.request.urlWithParams).toEqual(NEW_CONFIGURATION_URI);
      expect(APP_CONFIGURATION_REQUEST.request.method).toEqual('GET');
      expect(APP_CONFIGURATION_REQUEST.request.body).toBeFalsy();
      APP_CONFIGURATION_REQUEST.flush(testConfig);

      APPLICATION_LOAD_PROMISE.then(() : void => {
        expect(ConfigService.internalAppConfiguration).toEqual(testConfig as IAppConfiguration);
      });
    });

    it('should load the default development JSON into the service if no config was specified', () : void => {
      const DEFAULT_DEVELOPMENT_CONFIGURATION_URI : string = `assets/config/config.${ ENVIRONMENT.name }.json`;

      const APPLICATION_LOAD_PROMISE : Promise<void> = configService.loadApplicationConfiguration();

      const APP_CONFIGURATION_REQUEST : TestRequest = httpMock.expectOne(DEFAULT_DEVELOPMENT_CONFIGURATION_URI);
      expect(APP_CONFIGURATION_REQUEST.request.urlWithParams).toEqual(DEFAULT_DEVELOPMENT_CONFIGURATION_URI);
      expect(APP_CONFIGURATION_REQUEST.request.method).toEqual('GET');
      expect(APP_CONFIGURATION_REQUEST.request.body).toBeFalsy();
      APP_CONFIGURATION_REQUEST.flush(developmentConfig);

      APPLICATION_LOAD_PROMISE.then(() : void => {
        expect(ConfigService.internalAppConfiguration).toEqual(developmentConfig as IAppConfiguration);
      });
    });

    it('should not modify the application configuration if the HTTP request fails', () : void => {
      const DEFAULT_CONFIGURATION_URI : string = `assets/config/config.${ ENVIRONMENT.name }.json`;
      const MOCK_HTTP_ERROR_RESPONSE : HttpErrorResponse = {
        status : APP_CONSTANTS.httpResponseCodes['418'].httpCode,
        statusText : APP_CONSTANTS.httpResponseCodes['418'].httpStatusText
      } as any;

      const APPLICATION_LOAD_PROMISE : Promise<void> = configService.loadApplicationConfiguration();

      const APP_CONFIGURATION_REQUEST : TestRequest = httpMock.expectOne(DEFAULT_CONFIGURATION_URI);
      expect(APP_CONFIGURATION_REQUEST.request.urlWithParams).toEqual(DEFAULT_CONFIGURATION_URI);
      expect(APP_CONFIGURATION_REQUEST.request.method).toEqual('GET');
      expect(APP_CONFIGURATION_REQUEST.request.body).toBeFalsy();
      APP_CONFIGURATION_REQUEST.error(MOCK_HTTP_ERROR_RESPONSE as any);

      APPLICATION_LOAD_PROMISE.then(() : void => {
        expect(ConfigService.internalAppConfiguration).toEqual(DEFAULT_APP_CONFIGURATION);
      });
    });
  });
});
