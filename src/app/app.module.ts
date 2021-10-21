/*****************************************************************************************************************************************************
 * This module serves as the root application module and is bootstrapped to start the application. It imports all other feature modules to aid in
 * application modularity and scalability, often asynchronously.
 *
 * {@link https://angular.io/guide/architecture#modules | Angular Module Guide}
 ****************************************************************************************************************************************************/

import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS, MatProgressSpinnerDefaultOptions } from '@angular/material/progress-spinner';
import { MAT_TABS_CONFIG, MatTabsConfig } from '@angular/material/tabs';
import { MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltipDefaultOptions } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from 'app/app-routing.module';
import { CoreModule } from '@core/core.module';

import { AppHttpInterceptor } from '@core/interceptors/app-http/app-http.interceptor';
import { SpinnerInterceptor } from '@core/interceptors/spinner/spinner.interceptor';

import { ConfigService } from '@core/services/config/config.service';

import { AppComponent } from 'app/app.component';

/**
 * This function is called to begin the asynchronous retrieval of the base application configuration data from an endpoint.
 *
 * @param configService - an instance of the Config Service to use to initialize the application
 * @returns a function which returns a Promise (an object representing the eventual completion of an asynchronous operation).
 */
function initializeApplication(configService : ConfigService) : () => Promise<void> {
  return async() : Promise<void> => {
    await configService.loadApplicationConfiguration();
  };
}

/* eslint-disable prefer-const */

let matProgressSpinnerDefaultOptions : MatProgressSpinnerDefaultOptions = {
  diameter : ConfigService.appConfiguration.constants.progressSpinnerDiameterPX,
  strokeWidth : ConfigService.appConfiguration.constants.progressSpinnerStrokeWidthPX
};

let matTabsConfig : MatTabsConfig = {
  disablePagination : ConfigService.appConfiguration.flags.disableTabPagination,
  dynamicHeight : ConfigService.appConfiguration.flags.dynamicTabHeight,
  fitInkBarToContent : ConfigService.appConfiguration.flags.fitTabInkBarToContent,
  animationDuration : String(ConfigService.appConfiguration.constants.genericAnimationDurationMS)
};

let matTooltipDefaultOptions : MatTooltipDefaultOptions = {
  hideDelay : ConfigService.appConfiguration.constants.tooltipHideDelayMS,
  showDelay : ConfigService.appConfiguration.constants.tooltipShowDelayMS,
  touchendHideDelay : ConfigService.appConfiguration.constants.touchendHideDelayMS,
  touchGestures : 'auto',
  position : 'below'
};

/* eslint-enable prefer-const */

@NgModule({
  bootstrap : [AppComponent],
  declarations : [AppComponent],
  imports : [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    CoreModule
  ],
  providers : [
    Title,
    {
      multi : true,
      provide : HTTP_INTERCEPTORS,
      useClass : AppHttpInterceptor
    },
    {
      multi : true,
      provide : HTTP_INTERCEPTORS,
      useClass : SpinnerInterceptor
    },
    {
      multi : true,
      deps : [ConfigService],
      provide : APP_INITIALIZER,
      useFactory : initializeApplication
    },
    {
      deps : [ConfigService],
      provide : MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS,
      useValue : matProgressSpinnerDefaultOptions
    },
    {
      deps : [ConfigService],
      provide : MAT_TABS_CONFIG,
      useValue : matTabsConfig
    },
    {
      deps : [ConfigService],
      provide : MAT_TOOLTIP_DEFAULT_OPTIONS,
      useValue : matTooltipDefaultOptions
    }
  ]
})
export class AppModule { }
