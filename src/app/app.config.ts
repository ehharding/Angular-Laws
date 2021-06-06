/*****************************************************************************************************************************************************
 * Copyright 2021 Evan H. Harding. All Rights Reserved.
 *
 * This file serves as the base application configuration file. It holds logic responsible for retrieving basic application configuration data from
 * an endpoint on startup. For now, this endpoint is a local JSON configuration file.
 ****************************************************************************************************************************************************/

/* eslint-disable @typescript-eslint/no-explicit-any */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { DEFAULT_APP_CONFIG, IAppConfig } from 'app/app-config.model';
import { ENVIRONMENT } from '@environment/environment.development';

import { lastValueFrom } from 'rxjs';

@Injectable()
export class AppConfig {
  public static appConfig : IAppConfig = DEFAULT_APP_CONFIG;

  public constructor(private readonly _httpClient : HttpClient) { }

  /**
   * This function loads the global base application configuration data into the static `appConfig` class member. This should be called once when the
   * application is bootstrapped.
   *
   * @returns a Promise, or an object representing the eventual completion (or failure) of the asynchronous configuration retrieval, and its value.
   */
  public async loadApplicationConfiguration() : Promise<void> {
    const APP_CONFIG_JSON_PATH : string = `assets/config/config.${ ENVIRONMENT.name }.json`;

    await new Promise<void>((resolve : (value : void | PromiseLike<void>) => void, reject : (reason ?: any) => void) : void => {
      // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
      lastValueFrom(this._httpClient.get<IAppConfig>(APP_CONFIG_JSON_PATH)).then((appConfig : IAppConfig) : void => {
        AppConfig.appConfig = appConfig;

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
