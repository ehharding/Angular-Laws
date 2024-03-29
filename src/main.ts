/**
 * This file serves as the main entry point for the application. It compiles the application and bootstraps the root module, conventionally called AppModule, to run in the
 * browser.
 *
 * {@link https://angular.io/guide/file-structure#application-source-files | Angular File Structure Guide}
 */

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { ENVIRONMENT } from '@environment/environment.development';

import { AppModule } from 'app/app.module';

if (ENVIRONMENT.name === 'production') {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule).catch((error : unknown) : void => {
  console.error(error);
});
