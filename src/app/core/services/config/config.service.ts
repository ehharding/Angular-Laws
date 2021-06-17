/*****************************************************************************************************************************************************
 * This service handles the loading of external JSON configuration files. This should be done once, on startup, in `app.module.ts`.
 ****************************************************************************************************************************************************/

/* eslint-disable @typescript-eslint/no-explicit-any */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { DEFAULT_APP_CONFIGURATION, IAppConfiguration } from '@core/services/config/config.model';
import { ENVIRONMENT } from '@environment/environment.development';

import { lastValueFrom } from 'rxjs';

@Injectable()
export class ConfigService {
  public static internalAppConfiguration : IAppConfiguration = DEFAULT_APP_CONFIGURATION;

  public constructor(private readonly _httpClient : HttpClient) { }

  /**
   * This function loads the global base application configuration data into the static `internalAppConfiguration` class member. This should be called
   * once on startup.
   *
   * @returns a Promise, or an object representing the eventual completion (or failure) of the asynchronous configuration retrieval, and its value.
   */
  public async loadApplicationConfiguration(jsonConfigUrl : string = `assets/config/config.${ ENVIRONMENT.name }.json`) : Promise<void> {
    await new Promise<void>((resolve : (value : void | PromiseLike<void>) => void, reject : (reason ?: any) => void) : void => {
      // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
      lastValueFrom(this._httpClient.get<IAppConfiguration>(jsonConfigUrl)).then((internalAppConfiguration : IAppConfiguration) : void => {
        ConfigService.internalAppConfiguration = internalAppConfiguration;

        resolve();
      }).catch((response : any) : void => {
        ConfigService.internalAppConfiguration = DEFAULT_APP_CONFIGURATION;

        const ERROR : Error = {
          name : 'Error',
          message : `Could Not Load Application Configuration File With Path '${ jsonConfigUrl }': ${ response as string }`
        };

        reject(ERROR);
      });
    });
  }
}
