/*****************************************************************************************************************************************************
 * This service handles the loading of external JSON configuration files. This should be done once, on startup, in `app.module.ts`.
 ****************************************************************************************************************************************************/

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { lastValueFrom } from 'rxjs';

import { DEFAULT_APP_CONFIGURATION, IAppConfiguration } from '@core/services/config/config.model';
import { ENVIRONMENT } from '@environment/environment.development';

@Injectable({ providedIn : 'root' })
export class ConfigService {
  public static internalAppConfiguration : IAppConfiguration = DEFAULT_APP_CONFIGURATION;

  public constructor(private readonly _httpClient : HttpClient) { }

  /**
   * This function loads the global base application configuration data into the static `internalAppConfiguration` class member. This should be called
   * once on startup.
   *
   * @param jsonConfigURI - the Uniform Resource Identifier (URI), relative to the `src` folder, of the application configuration JSON to load
   * @returns a Promise, or an object representing the eventual completion (or failure) of the asynchronous configuration retrieval, and its value.
   */
  public async loadApplicationConfiguration(jsonConfigURI : string = `assets/config/config.${ ENVIRONMENT.name }.json`) : Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await new Promise<void>((resolve : (value : void | PromiseLike<void>) => void, reject : (reason ?: any) => void) : void => {
      lastValueFrom(this._httpClient.get<IAppConfiguration>(jsonConfigURI)).then((internalAppConfiguration : IAppConfiguration) : void => {
        ConfigService.internalAppConfiguration = internalAppConfiguration;

        resolve();
      }).catch((errorResponse : HttpErrorResponse) : void => {
        reject(errorResponse);
      });
    });
  }
}
