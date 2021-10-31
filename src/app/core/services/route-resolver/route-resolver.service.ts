/******************************************************************************************************************************************************************************
 * This service is invoked whenever an unknown application route is encountered and attempts to provide suggestions as to the intended route meant by the user.
 *****************************************************************************************************************************************************************************/

/* eslint-disable id-length */

import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

import { distance } from 'fastest-levenshtein';

import { AppRoute } from 'app/app-routing.module';

@Injectable()
export class RouteResolverService implements Resolve<string | null> {
  /* eslint-disable @typescript-eslint/no-magic-numbers */

  /**
   * Returns a threshold or, in this case, a maximum length delta of difference between the requested route and the correct values defined in the "AppPath" enum defined in
   * "app-routing.module.ts". The threshold returned here is then used to return a list of possible correct routes as defined in "AppPath".
   *
   * For example, if "/contributors" is a valid route and the user enters "/ccontributorrs", the threshold returned will be 5 since the requested path has a word length of 14.
   * This would then mean that any paths defined in "AppPath" that vary in length by this threshold amount or less would be candidates for being the intended route.
   *
   * @param requestedPath - the requested route given by the user
   * @returns a threshold number as described above.
   */
  private static _getThreshold(requestedPath : string) : number {
    if (requestedPath.length < 5) {
      return 3;
    }

    return 5;
  }

  /* eslint-enable @typescript-eslint/no-magic-numbers */

  /**
   * This method is responsible for providing a response route to the requested route by a user, where the requested route resulted in an unknown application route being
   * encountered.
   *
   * @param _route - The ActivatedRouteSnapshot object that contains information about the unknown route entered by the user
   * @param state - The RouterStateSnapshot object that contains information about the state of the router at a moment in time
   * @returns Either a string list (comma delimited string) of the existing application routes that seem to resemble the requested route or null if none seem to match at all.
   */
  public resolve(_route : ActivatedRouteSnapshot, state : RouterStateSnapshot) : string | null { // _route Is Required To Implement This Function From Resolve
    const REQUESTED_ROUTE : string = state.url.replace('/', '');
    const THRESHOLD : number = RouteResolverService._getThreshold(REQUESTED_ROUTE); // eslint-disable-line no-underscore-dangle

    const POSSIBLE_INTENDED_ROUTES : AppRoute[] = Object.values(AppRoute).filter((route : AppRoute) : boolean => {
      return Math.abs(route.length - REQUESTED_ROUTE.length) < THRESHOLD;
    });

    if (POSSIBLE_INTENDED_ROUTES.length === 0) {
      return null;
    }

    // For The Application Routes That Are In The Threshold In String Length; Sort Them Via The Levenshtein Algorithm (see https://en.wikipedia.org/wiki/Levenshtein_distance)
    return this._sortByLevenshtein(REQUESTED_ROUTE).join(',');
  }

  /**
   * This method is responsible for sorting the application routes into suggestions by comparing them to the requested route. Any routes that seem to "resemble" the requested
   * route are returned. This could be empty.
   *
   * @param requestedRoute - The requested route entered by the user
   * @returns The list of existing application routes, if any, that resemble the requested route.
   */
  private _sortByLevenshtein(requestedRoute : string) : AppRoute[] {
    const APP_ROUTES : AppRoute[] = Object.values(AppRoute);
    const ROUTES_DISTANCE : Record<string, number> = { } as Record<string, number>;

    APP_ROUTES.sort((a : AppRoute | string, b : AppRoute | string) : number => {
      if (!(a in ROUTES_DISTANCE)) {
        ROUTES_DISTANCE[a] = distance(a, requestedRoute);
      }

      if (!(b in ROUTES_DISTANCE)) {
        ROUTES_DISTANCE[b] = distance(b, requestedRoute);
      }

      return ROUTES_DISTANCE[a] - ROUTES_DISTANCE[b];
    });

    return APP_ROUTES;
  }
}
