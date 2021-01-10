import 'zone.js/dist/zone-testing';

/*****************************************************************************************************************************************************
 * Copyright 2020 Evan H. Harding. All Rights Reserved.
 *
 * This file defines the environment under which we test the application via Karma.
 *
 * {@link https://angular.io/guide/testing | Angular Testing Guide}
 * @remarks 'import 'zone.js/dist/zone-testing' must be the first line of this file.
 ****************************************************************************************************************************************************/

/*  eslint-disable @typescript-eslint/naming-convention */

import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { getTestBed } from '@angular/core/testing';

declare const require : { context(path : string, deep ? : boolean, filter ? : RegExp) : { keys() : string[]; <T>(id : string) : T; }; };

// Initialize the Angular testing environment
getTestBed().initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());

// Find all tests in the project
const context : { <T>(id : string) : T; keys() : string[]; } = require.context('./', true, /\.spec\.ts$/);

// Load their modules
context.keys().map(context);
