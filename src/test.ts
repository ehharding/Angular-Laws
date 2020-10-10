/*****************************************************************************************************************************************************
 * Copyright 2020 Evan H. Harding. All Rights Reserved.
 *
 * test.ts - TypeScript
 *
 * @see https://angular.io/guide/testing
 * @description This file defines the environment under which we test the application via Karma.
 ****************************************************************************************************************************************************/

import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { getTestBed } from '@angular/core/testing';

import 'zone.js/dist/zone-testing';

// eslint-disable-next-line init-declarations
declare const require : { context(path : string, deep? : boolean, filter? : RegExp) : { keys() : string[]; <T>(id : string) : T; }; };

// Initialize the Angular Testing Environment
getTestBed().initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());

// Find All Tests In the Project
const context: { <T>(id : string) : T, keys() : string[] } = require.context('./', true, /\.spec\.ts$/);

// Load Their Modules
context.keys().map(context);
