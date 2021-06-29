/*****************************************************************************************************************************************************
 * This module serves as the root application module and is bootstrapped to start the application. It imports all other feature modules to aid in
 * application modularity and scalability, often asynchronously.
 *
 * {@link https://angular.io/guide/architecture#modules | Angular Module Guide}
 ****************************************************************************************************************************************************/

import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltipDefaultOptions } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { IN_MEMORY_BACKEND_CONFIG_ARGS, MAT_TOOLTIP_DEFAULT_CONFIG } from 'app/app.model';
import { AppRoutingModule } from 'app/app-routing.module';
import { CoreModule } from '@core/core.module';

import { AppHttpInterceptor } from '@core/interceptors/app-http/app-http.interceptor';

import { ConfigService } from '@core/services/config/config.service';
import { InMemoryDataService } from '@core/services/in-memory-data/in-memory-data.service';

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
  imports : [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, IN_MEMORY_BACKEND_CONFIG_ARGS),
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
      deps : [ConfigService],
      provide : APP_INITIALIZER,
      useFactory : initializeApplication
    },
    {
      deps : [ConfigService],
      provide : MAT_TOOLTIP_DEFAULT_OPTIONS,
      useFactory : () : MatTooltipDefaultOptions => MAT_TOOLTIP_DEFAULT_CONFIG
    }
  ]
})
export class AppModule { }
