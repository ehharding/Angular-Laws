import 'zone.js/dist/zone-testing';

/*****************************************************************************************************************************************************
 * Copyright 2021 Evan H. Harding. All Rights Reserved.
 *
 * This file defines the environment under which we test the application via Karma.
 *
 * {@link https://angular.io/guide/testing | Angular Testing Guide}
 *
 * @remarks 'import 'zone.js/dist/zone-testing' must be the first line of this file.
 ****************************************************************************************************************************************************/

/*  eslint-disable @typescript-eslint/naming-convention */

import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { getTestBed } from '@angular/core/testing';

declare const require : { context(path : string, deep ? : boolean, filter ? : RegExp) : { keys() : string[]; <T>(id : string) : T; }; };

// Initialize The Angular Testing Environment
getTestBed().initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());

// Find All Tests In The Project
const context : { <T>(id : string) : T; keys() : string[]; } = require.context('./', true, /\.spec\.ts$/);

// Load Their Modules
context.keys().map(context);
