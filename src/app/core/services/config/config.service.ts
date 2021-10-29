/******************************************************************************************************************************************************************************
 * This service handles the loading of external JSON configuration files. This should be done once, on startup, in `app.module.ts`.
 *****************************************************************************************************************************************************************************/

import { HttpBackend, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { distinctUntilChanged, lastValueFrom } from 'rxjs';

import { ENVIRONMENT } from '@environment/environment.development';

import { AppConfiguration, DEFAULT_APP_CONFIGURATION } from '@core/services/config/config.model';

@Injectable({ providedIn : 'root' })
export class ConfigService {
  public static appConfiguration : AppConfiguration = DEFAULT_APP_CONFIGURATION;

  private readonly _httpClient : HttpClient;

  public constructor(private readonly _httpBackend : HttpBackend) {
    this._httpClient = new HttpClient(this._httpBackend);
  }

  /**
   * This function loads the global base application configuration data into the static `appConfiguration` class member. This should be called once on startup.
   *
   * @returns a Promise, or an object representing the eventual completion (or failure) of the asynchronous configuration retrieval, and its value.
   */
  public async loadApplicationConfiguration() : Promise<void> {
    const JSON_CONFIG_URI : string = `assets/config/config.${ ENVIRONMENT.name }.json`;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await new Promise<void>((resolve : (value : void | PromiseLike<void>) => void, reject : (reason ?: any) => void) : void => {
      lastValueFrom(this._httpClient.get<AppConfiguration>(JSON_CONFIG_URI).pipe(distinctUntilChanged())).then((appConfiguration : AppConfiguration) : void => {
        ConfigService.appConfiguration = appConfiguration;

        resolve();
      }).catch((errorResponse : HttpErrorResponse) : void => {
        reject(errorResponse);
      });
    });
  }
}
