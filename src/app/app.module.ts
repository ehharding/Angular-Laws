/**
 * This module serves as the root application module and is bootstrapped to start the application. It imports all other feature modules to aid in application modularity and
 * scalability, often asynchronously.
 *
 * {@link https://angular.io/guide/architecture#modules | Angular Module Guide}
 *
 * @remarks Be sure to note that the order of Providers in the AppModule is highly important. Providers will initialize in the order they are declared.
 */

import { APP_INITIALIZER, InjectionToken, NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ServiceWorkerModule } from '@angular/service-worker';

import { ENVIRONMENT } from '@environment/environment.development';

import { AppRoutingModule } from 'app/app-routing.module';
import { CoreModule } from '@core/core.module';

import { ConfigService } from '@core/services/config/config.service';

import { AppComponent } from 'app/app.component';

/**
 * This function is called to begin the asynchronous retrieval of the base application configuration data from an endpoint.
 *
 * @param configService - An instance of the ConfigService to use to initialize the application
 * @returns a function, which returns a Promise (an object representing the eventual completion of an asynchronous operation, and its value).
 */
function initializeApplication(configService : ConfigService) : (() => Promise<void>) {
  return async() : Promise<void> => {
    await configService.loadApplicationConfiguration();
  };
}

const WINDOW_INJECTION_TOKEN : InjectionToken<Window> = new InjectionToken<Window>('window');

@NgModule({
  bootstrap : [AppComponent],
  declarations : [AppComponent],
  imports : [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    // Register The ServiceWorker As Soon As The Application Is Stable Or After 30 Seconds (Whichever Comes First)
    ServiceWorkerModule.register('ngsw-worker.js', { enabled : ENVIRONMENT.name === 'production', registrationStrategy : 'registerWhenStable:30000' }),
    AppRoutingModule,
    CoreModule
  ],
  providers : [
    Title,
    { provide : WINDOW_INJECTION_TOKEN, useFactory : () : Window => window },
    { multi : true, deps : [ConfigService], provide : APP_INITIALIZER, useFactory : initializeApplication }
  ]
})
class AppModule { }

export {
  AppModule
};
