/*****************************************************************************************************************************************************
 * This module serves as the root application module and is bootstrapped to start the application. It imports all other feature modules to aid in
 * application modularity and scalability, often asynchronously.
 *
 * {@link https://angular.io/guide/architecture#modules | Angular Module Guide}
 ****************************************************************************************************************************************************/

import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltipDefaultOptions } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from 'app/app-routing.module';
import { CoreModule } from '@core/core.module';

import { ConfigService } from '@core/services/config/config.service';

import { AppComponent } from 'app/app.component';

/**
 * This function is called to begin the asynchronous retrieval of the base application configuration data from an endpoint.
 *
 * @param configService - an instance of the Config Service to use to initialize the application
 * @returns a function which returns a Promise (an object representing the eventual completion of an asynchronous operation).
 */
// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
export function initializeApplication(configService : ConfigService) : () => Promise<void> {
  return async() : Promise<void> => {
    await configService.loadApplicationConfiguration();
  };
}

@NgModule({
  bootstrap : [AppComponent],
  declarations : [AppComponent],
  imports : [BrowserModule, BrowserAnimationsModule, AppRoutingModule, CoreModule],
  providers : [
    Title,
    {
      multi : true,
      deps : [ConfigService],
      provide : APP_INITIALIZER,
      useFactory : initializeApplication
    },
    {
      deps : [ConfigService],
      provide : MAT_TOOLTIP_DEFAULT_OPTIONS,
      useFactory() : MatTooltipDefaultOptions {
        return {
          hideDelay : ConfigService.internalAppConfiguration.constants.tooltipHideDelayMS,
          showDelay : ConfigService.internalAppConfiguration.constants.tooltipShowDelayMS,
          touchendHideDelay : ConfigService.internalAppConfiguration.constants.touchendHideDelayMS,
          touchGestures : 'auto',
          position : 'below'
        };
      }
    }
  ]
})
export class AppModule { }
