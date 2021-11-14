/******************************************************************************************************************************************************************************
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
 *****************************************************************************************************************************************************************************/

import { ExtraOptions, NoPreloading, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { ContributorsModule } from '@contributors/contributors.module';
import { LoginModule } from '@login/login.module';

import { LoginGuard } from '@core/guards/login/login.guard';
import { NotFoundGuard } from '@core/guards/not-found/not-found.guard';

import { RouteResolverService } from '@core/services/route-resolver/route-resolver.service';

import { NotFoundComponent } from '@core/components/not-found/not-found.component';

export enum AppRoute {
  Contributors = 'contributors',
  Login = 'login',
  Users = 'users',
  NotFound = '404'
}

export const APP_ROUTES : Routes = [
  { path : '', pathMatch : 'full', redirectTo : AppRoute.Contributors }, // In The Future This Would Load A Home Pocket Fic Module But, For Now, It Loads Contributors Instead
  { path : AppRoute.Contributors, loadChildren : async() : Promise<ContributorsModule> => (await import('@contributors/contributors.module')).ContributorsModule },
  { path : AppRoute.Login, canActivate : [LoginGuard], loadChildren : async() : Promise<LoginModule> => (await import('@login/login.module')).LoginModule },
  { path : AppRoute.NotFound, component : NotFoundComponent, resolve : { intendedRouteGuesses : RouteResolverService } }, // NotFoundComponent Is Fed Intended Route Guesses
  { path : '**', canActivate : [NotFoundGuard], component : NotFoundComponent }
];

const EXTRA_OPTIONS : ExtraOptions = {
  enableTracing : false,
  useHash : undefined,
  anchorScrolling : 'enabled',
  canceledNavigationResolution : 'replace',
  initialNavigation : 'enabledNonBlocking',
  onSameUrlNavigation : 'reload',
  paramsInheritanceStrategy : 'emptyOnly',
  preloadingStrategy : NoPreloading,
  relativeLinkResolution : 'corrected',
  scrollPositionRestoration : 'enabled',
  urlUpdateStrategy : 'eager'
};

@NgModule({
  exports : [RouterModule],
  imports : [RouterModule.forRoot(APP_ROUTES, EXTRA_OPTIONS)]
})
export class AppRoutingModule { }
