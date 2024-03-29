/**
 * This file handles navigation for the core application. The URLs defined here are the parent directories for the entire SPA. It enables navigation from one view to the next
 * as users perform application tasks. A change in the browser URL indicates an instruction to change the view to the corresponding component.
 *
 * {@link https://angular.io/guide/router | Angular Router Guide}
 *
 * @remarks The order of routes is important because the Angular Router uses a first-match wins strategy when matching routes, so more specific routes should be placed above
 *          less specific routes. To render the routed view corresponding to a browser URL, use the router outlet HTML like so:
 * ```html
 * <router-outlet></router-outlet>
 * ```
 */

import { ExtraOptions, NoPreloading, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { HomeComponent } from '@core/components/home/home.component';

const EXTRA_OPTIONS : ExtraOptions = {
  enableTracing : false,
  useHash : undefined,
  anchorScrolling : 'enabled',
  canceledNavigationResolution : 'replace',
  initialNavigation : 'enabledNonBlocking',
  onSameUrlNavigation : 'reload',
  paramsInheritanceStrategy : 'emptyOnly',
  preloadingStrategy : NoPreloading,
  scrollPositionRestoration : 'enabled',
  urlUpdateStrategy : 'eager'
};

const APP_ROUTES : Routes = [
  { path : '', pathMatch : 'full', component : HomeComponent }
];

@NgModule({
  exports : [RouterModule],
  imports : [RouterModule.forRoot(APP_ROUTES, EXTRA_OPTIONS)]
})
class AppRoutingModule { }

export {
  AppRoutingModule,
  APP_ROUTES
};
