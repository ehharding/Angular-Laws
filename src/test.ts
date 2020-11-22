/*****************************************************************************************************************************************************
 * Copyright 2020 Evan H. Harding. All Rights Reserved.
 *
 * This file defines the environment under which we test the application via Karma.
 *
 * {@link https://angular.io/guide/testing | Angular Testing Guide}
 ****************************************************************************************************************************************************/

import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { getTestBed } from '@angular/core/testing';

import 'zone.js/dist/zone-testing';

declare const REQUIRE : { context(path : string, deep ? : boolean, filter ? : RegExp) : { keys() : string[]; <T>(id : string) : T; }; };

// Initialize the Angular testing environment
getTestBed().initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());

// Find all tests in the project
const CONTEXT : { <T>(id : string) : T; keys() : string[]; } = REQUIRE.context('./', true, /\.spec\.ts$/);

// Load their modules
CONTEXT.keys().map(CONTEXT);
