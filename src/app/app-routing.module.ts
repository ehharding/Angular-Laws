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

import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { ContributorsModule } from '@contributors/contributors.module';

import { RouteResolverService } from '@core/services/route-resolver/route-resolver.service';

import { NotFoundComponent } from '@core/components/not-found/not-found.component';

export enum AppRoute {
  Contributors = 'contributors'
}

const ROUTES : Routes = [
  { path : '', pathMatch : 'full', redirectTo : AppRoute.Contributors },
  { path : AppRoute.Contributors, loadChildren : async() : Promise<ContributorsModule> => (await import('@contributors/contributors.module')).ContributorsModule },
  { path : '**', component : NotFoundComponent, resolve : { possibleIntendedRoutes : RouteResolverService } }
];

const EXTRA_OPTIONS : ExtraOptions = {
  anchorScrolling : 'enabled',
  onSameUrlNavigation : 'reload',
  urlUpdateStrategy : 'eager',
  paramsInheritanceStrategy : 'emptyOnly',
  relativeLinkResolution : 'corrected'
};

@NgModule({
  exports : [RouterModule],
  imports : [RouterModule.forRoot(ROUTES, EXTRA_OPTIONS)]
})
export class AppRoutingModule { }
