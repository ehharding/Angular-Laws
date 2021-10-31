/******************************************************************************************************************************************************************************
 * This file handles the activation of wildcard routes within the application. It handles the navigation of such route requests to the "/404" route while providing that path
 * with the request.
 *****************************************************************************************************************************************************************************/

import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { AppRoute } from 'app/app-routing.module';

@Injectable()
export class NotFoundGuard implements CanActivate {
  public constructor(private readonly _router : Router) { }

  /**
   * This method determines if the wildcard application route can be activated. In reality, this implementation is a proxy method that always denies access to the unknown
   * route and instead navigates to the "/404" route, injecting information about the requested route that the user made, where it is further handled.
   *
   * For example, if the user tried to navigate to "/abc" (assuming that "abc" is an invalid application route), this method would deny access to "/abc" and navigate to
   * "/404?requestedRoute=abc" instead, telling the NotFoundComponent invoked on that route that the user attempted to access the invalid "abc" route.
   *
   * @param _route - The ActivatedRouteSnapshot object that contains information about the unknown route entered by the user
   * @returns a Promise, or an object representing the eventual completion (or failure) of the asynchronous route navigation resolution, and its value.
   */
  public async canActivate(_route : ActivatedRouteSnapshot) : Promise<boolean> {
    await this._router.navigate([AppRoute.NotFound], { queryParams : { requestedRoute : _route.url.join('/') } });

    return await new Promise<boolean>((resolve : (value : boolean) => void) : void => {
      resolve(false);
    });
  }
}
