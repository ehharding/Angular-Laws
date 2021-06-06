/*****************************************************************************************************************************************************
 * Copyright 2021 Evan H. Harding. All Rights Reserved.
 *
 * This module serves as the root application module and is bootstrapped to start the application. It imports all other feature modules to aid in
 * application modularity and scalability, often asynchronously.
 *
 * {@link https://angular.io/guide/architecture#modules | Angular Module Guide}
 ****************************************************************************************************************************************************/

import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltipDefaultOptions } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppConfig } from 'app/app.config';
import { AppRoutingModule } from 'app/app-routing.module';
import { CoreModule } from '@core/core.module';

import { AppComponent } from 'app/app.component';

/**
 * This function is called to begin the asynchronous retrieval of the base application configuration data from an endpoint.
 *
 * @param appConfig - the application configuration to retrieve
 * @returns a function which returns a Promise (an object representing the eventual completion of an asynchronous operation).
 */
// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
export function initializeApplication(appConfig : AppConfig) : () => Promise<void> {
  return async() : Promise<void> => {
    await appConfig.loadApplicationConfiguration();
  };
}

@NgModule({
  bootstrap : [AppComponent],
  declarations : [AppComponent],
  imports : [BrowserModule, BrowserAnimationsModule, AppRoutingModule, CoreModule],
  providers : [
    Title,
    AppConfig,
    {
      multi : true,
      deps : [AppConfig],
      provide : APP_INITIALIZER,
      useFactory : initializeApplication
    },
    {
      deps : [AppConfig],
      provide : MAT_TOOLTIP_DEFAULT_OPTIONS,
      useFactory() : MatTooltipDefaultOptions {
        return {
          hideDelay : AppConfig.appConfig.constants.tooltipHideDelayMS,
          showDelay : AppConfig.appConfig.constants.tooltipShowDelayMS,
          touchendHideDelay : AppConfig.appConfig.constants.touchendHideDelayMS,
          touchGestures : 'auto',
          position : 'below'
        };
      }
    }
  ]
})
export class AppModule { }
