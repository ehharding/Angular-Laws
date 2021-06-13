/*****************************************************************************************************************************************************
 * Copyright 2021 Evan H. Harding. All Rights Reserved.
 *
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
  public async loadApplicationConfiguration() : Promise<void> {
    const APP_CONFIG_JSON_PATH : string = `assets/config/config.${ ENVIRONMENT.name }.json`;

    await new Promise<void>((resolve : (value : void | PromiseLike<void>) => void, reject : (reason ?: any) => void) : void => {
      // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
      lastValueFrom(this._httpClient.get<IAppConfiguration>(APP_CONFIG_JSON_PATH)).then((internalAppConfiguration : IAppConfiguration) : void => {
        ConfigService.internalAppConfiguration = internalAppConfiguration;

        resolve();
      }).catch((response : any) : void => {
        const ERROR : Error = {
          name : 'Error',
          message : `Could Not Load Application Configuration File With Path '${ APP_CONFIG_JSON_PATH }' : ${ JSON.stringify(response) }`
        };

        reject(ERROR);
      });
    });
  }
}
