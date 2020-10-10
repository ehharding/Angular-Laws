/*****************************************************************************************************************************************************
 * Copyright 2020 Evan H. Harding. All Rights Reserved.
 *
 * app-routing.module.ts - TypeScript
 *
 * @see https://angular.io/guide/router
 * @description This file handles navigation for the core application. The URLs defined here are the parent directories for the entire SPA. It enables
 * navigation from one view to the next as users perform application tasks. A change in the browser URL indicates an instruction to change the view to
 * the corresponding component.
 *
 * @usageNotes The order of routes is important because the Angular Router uses a first-match wins strategy when matching routes, so more specific
 * routes should be placed above less specific routes. To render the routed view corresponding to a browser URL, use the router outlet HTML like so:
 * ```html
 *      <router-outlet></router-outlet>
 * ```
 ****************************************************************************************************************************************************/

import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AppComponent } from 'app/app.component';

const routes : Routes = [
  { path : '', pathMatch : 'full', redirectTo : 'internet' },
  { path : 'internet', component : AppComponent }
];

@NgModule({
  exports : [RouterModule],
  imports : [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }
