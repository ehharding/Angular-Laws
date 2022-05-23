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
import { CDK_COPY_TO_CLIPBOARD_CONFIG, CdkCopyToClipboardConfig } from '@angular/cdk/clipboard';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS, MatProgressSpinnerDefaultOptions } from '@angular/material/progress-spinner';
import { MAT_TABS_CONFIG, MatTabsConfig } from '@angular/material/tabs';
import { MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltipDefaultOptions } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ServiceWorkerModule } from '@angular/service-worker';

import { ENVIRONMENT } from '@environment/environment.development';

import { AppRoutingModule } from 'app/app-routing.module';
import { CoreModule } from '@core/core.module';

import { AppHttpInterceptor } from '@core/interceptors/app-http/app-http.interceptor';
import { AuthInterceptor } from '@core/interceptors/auth/auth.interceptor';
import { BackendInterceptor } from '@core/interceptors/backend/backend.interceptor';
import { SpinnerInterceptor } from '@core/interceptors/spinner/spinner.interceptor';

import { ConfigService } from '@core/services/config/config.service';
import { CredentialService } from '@core/services/credential/credential.service';
import { SpinnerService } from '@core/services/spinner/spinner.service';

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

const CONFIGURED_CDK_COPY_TO_CLIPBOARD_CONFIG : CdkCopyToClipboardConfig = {
  attempts : ConfigService.appConfiguration.constants.maxClipboardCopyAttempts
};

const CONFIGURED_MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS : MatProgressSpinnerDefaultOptions = {
  diameter : ConfigService.appConfiguration.constants.progressSpinnerDiameterPX,
  strokeWidth : ConfigService.appConfiguration.constants.progressSpinnerStrokeWidthPX
};

const CONFIGURED_MAT_TABS_CONFIG : MatTabsConfig = {
  disablePagination : ConfigService.appConfiguration.flags.disableTabPagination,
  dynamicHeight : ConfigService.appConfiguration.flags.dynamicTabHeight,
  fitInkBarToContent : ConfigService.appConfiguration.flags.fitTabInkBarToContent,
  animationDuration : `${ ConfigService.appConfiguration.constants.genericAnimationDurationMS }ms`
};

const CONFIGURED_MAT_TOOLTIP_DEFAULT_OPTIONS : MatTooltipDefaultOptions = {
  hideDelay : ConfigService.appConfiguration.constants.tooltipHideDelayMS,
  showDelay : ConfigService.appConfiguration.constants.tooltipShowDelayMS,
  touchendHideDelay : ConfigService.appConfiguration.constants.touchendHideDelayMS,
  touchGestures : 'auto',
  position : 'below'
};

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
    { multi : true, deps : [ConfigService], provide : APP_INITIALIZER, useFactory : initializeApplication },
    { multi : false, deps : [], provide : CDK_COPY_TO_CLIPBOARD_CONFIG, useValue : CONFIGURED_CDK_COPY_TO_CLIPBOARD_CONFIG },
    { multi : false, deps : [], provide : MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS, useValue : CONFIGURED_MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS },
    { multi : false, deps : [], provide : MAT_TABS_CONFIG, useValue : CONFIGURED_MAT_TABS_CONFIG },
    { multi : false, deps : [], provide : MAT_TOOLTIP_DEFAULT_OPTIONS, useValue : CONFIGURED_MAT_TOOLTIP_DEFAULT_OPTIONS },
    { multi : true, deps : [], provide : HTTP_INTERCEPTORS, useClass : AppHttpInterceptor },
    { multi : true, deps : [SpinnerService], provide : HTTP_INTERCEPTORS, useClass : SpinnerInterceptor },
    { multi : true, deps : [], provide : HTTP_INTERCEPTORS, useClass : BackendInterceptor },
    { multi : true, deps : [CredentialService], provide : HTTP_INTERCEPTORS, useClass : AuthInterceptor }
  ]
})
export class AppModule { }
