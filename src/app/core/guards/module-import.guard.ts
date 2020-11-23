/*****************************************************************************************************************************************************
 * Copyright 2020 Evan H. Harding. All Rights Reserved.
 *
 * Call functions in this file whenever you'd like to protect against a certain module being imported to more than one module, or want
 * some altogether similar functionality.
 ****************************************************************************************************************************************************/

import { CoreModule } from '@core/core.module';

/**
 * Throws an error if the provided parent NgModule has already been imported by another NgModule. This ensures that the module is imported a single
 * time.
 *
 * @param parentModule - The NgModule that you would like to prevent being loaded more than once in the place you call this function
 * @param moduleName - The name of the NgModule provided above
 *
 * @remarks For example, CoreModule should only be loaded a single time in app/app.module.ts. So, in core.module.ts:
 * ```typescript
 *   import { Optional, SkipSelf } from '@angular/core';
 *
 *   import { throwIfAlreadyLoaded } from '@core/guards/module-import.guard';
 *   ...
 *   export class CoreModule {
 *     constructor(@Optional() @SkipSelf() parentModule : CoreModule) {
 *       throwIfAlreadyLoaded(parentModule, 'CoreModule')
 *     }
 *   }
 * ```
 */
export function throwIfAlreadyLoaded(parentModule : CoreModule, moduleName : string) : void {
  if (parentModule) { // eslint-disable-line @typescript-eslint/no-unnecessary-condition
    throw new Error(`${ moduleName } Has Already Been Loaded. Import Such Modules Only Once.`);
  }
}
