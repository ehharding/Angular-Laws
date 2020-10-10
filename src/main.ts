/*****************************************************************************************************************************************************
 * Copyright 2020 Evan H. Harding. All Rights Reserved.
 *
 * main.ts - TypeScript
 *
 * @see https://angular.io/guide/file-structure#application-source-files
 * @description This file serves as the main entry point for the application. It compiles the application and bootstraps the root module,
 * conventionally called AppModule, to run in the browser.
 ****************************************************************************************************************************************************/

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from 'app/app.module';

import { environment } from '@environment/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule).catch((genericError: any) => {
  return console.error(genericError);
});
