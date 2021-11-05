/******************************************************************************************************************************************************************************
 * This file handles the activation of wildcard routes within the application. It handles the navigation of such route requests to the "/404" route while providing that path
 * with the request.
 *****************************************************************************************************************************************************************************/

import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';

import { ENVIRONMENT } from '@environment/environment.development';

import { AppRoute } from 'app/app-routing.module';

@Injectable()
export class NotFoundGuard implements CanActivate {
  /**
   * This method determines if the wildcard application route can be activated. In reality, this implementation is a proxy method that always denies access to the unknown
   * route and instead navigates to the "/404" route, injecting information about the requested route that the user made, where it is further handled.
   *
   * For example, if the user tried to navigate to "/abc" (assuming that "abc" is an invalid application route), this method would deny access to "/abc" and navigate to
   * "/404?requestedRoute=abc" instead, telling the NotFoundComponent invoked after that route is activated that the user attempted to access the invalid "abc" route.
   *
   * @param route - The ActivatedRouteSnapshot object that contains information about the unknown route entered by the user
   * @returns a Promise, or an object representing the eventual completion (or failure) of the asynchronous route navigation resolution, and its value.
   */
  public async canActivate(route : ActivatedRouteSnapshot) : Promise<boolean> {
    const DEVELOPMENT_NOT_FOUND_URL : string = `/${ AppRoute.NotFound }?requestedRoute=${ encodeURIComponent(route.url.join('/')) }`;
    const PRODUCTION_NOT_FOUND_URL : string = `/Pocket-Fic/${ AppRoute.NotFound }?requestedRoute=${ encodeURIComponent(route.url.join('/')) }`;

    location.replace(ENVIRONMENT.name === 'production' ? PRODUCTION_NOT_FOUND_URL : DEVELOPMENT_NOT_FOUND_URL);

    return await new Promise<boolean>((resolve : (value : boolean) => void) : void => {
      resolve(false);
    });
  }
}
