/**
 * The BackendInterceptor intercepts certain URL requests directed towards a backend and responds to the requests appropriately, instead of directing the requests towards an
 * actual server, as would be the case in the eventual application.
 *
 * {@link https://angular.io/guide/http#intercepting-requests-and-responses | Angular Intercepting Requests And Responses Guide}
 */

import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, catchError, delay, dematerialize, materialize, mergeMap, of, throwError } from 'rxjs';

import { Contributor } from '@contributors/services/contributor/contributor.model';
import { HttpMethod } from '@core/services/config/config.model';
import { User } from '@core/services/user/user.model';

import { constructErrorResponse$, constructOkResponse$ } from '@shared/utilities/http-response/http-response.utility';

import { ConfigService } from '@core/services/config/config.service';

@Injectable()
class BackendInterceptor implements HttpInterceptor {
  // eslint-disable-next-line no-warning-comments
  /**
   * This function is responsible for intercepting certain URL requests directed towards a backend and responds with mock data as appropriate.
   *
   * @param httpRequest - An outgoing HTTP request, which is being intercepted
   * @param httpHandler - A handler that dispatches the HTTP httpRequest to the next handler in the chain, as determined by order in "app.module.ts"
   * @returns an Observable of the HTTP event stream to be passed on to the next interceptor via httpHandler.handle(httpRequest : HttpRequest<unknown>).
   *
   * @remarks The inline comments concerning the use of materialize()/dematerialize() is a result of the following RxJS issue, which boils down to RxJS not time-shifting
   *          Observables properly when they emit errors https://github.com/Reactive-Extensions/RxJS/issues/648
   */
  public intercept(httpRequest : HttpRequest<unknown>, httpHandler : HttpHandler) : Observable<HttpEvent<unknown>> {
    const REQUEST_BODY : any = httpRequest.body;
    const REQUEST_METHOD : HttpMethod = httpRequest.method as HttpMethod;
    const REQUEST_URL : string = httpRequest.url;

    /**
     * This function responds to a request to retrieve a list of all contributors to the project.
     *
     * @returns an HttpResponse with the body being the list of contributors to the project, either loaded from LocalStorage, or a basic set of initial contributors if empty.
     */
    const getAllContributors$ = () : Observable<HttpEvent<unknown>> => {
      const ALL_CONTRIBUTORS : Contributor[] = JSON.parse(localStorage.getItem(ConfigService.appConfiguration.apiServer.paths.contributors.allContributors) ?? '[]') as Contributor[];

      return constructOkResponse$(ALL_CONTRIBUTORS);
    };

    /**
     * This function responds to a request to retrieve the list of all users for the application.
     *
     * @returns an HttpResponse with the body being the list of users to the project, either loaded from LocalStorage, or a basic set of initial users if empty.
     */
    const getAllUsers$ = () : Observable<HttpEvent<unknown>> => {
      const ALL_USERS : User[] = JSON.parse(localStorage.getItem(ConfigService.appConfiguration.apiServer.paths.users.allUsers) ?? '[]') as User[];

      return constructOkResponse$(ALL_USERS);
    };

    /**
     * This function responds to a request to retrieve the authenticated (logged in) user.
     *
     * @returns an HttpResponse with the body being the authenticated (logged in) user. This will be either a user with a valid JWT token if there is a logged-in user or null
     * otherwise.
     */
    const getCurrentUser$ = () : Observable<HttpEvent<unknown>> => {
      const CURRENT_USER : User | null = JSON.parse(localStorage.getItem(ConfigService.appConfiguration.apiServer.paths.users.currentUser) ?? 'null') as User | null;

      if (CURRENT_USER?.jwtToken) {
        return constructOkResponse$(CURRENT_USER);
      }

      return constructOkResponse$(null);
    };

    /**
     * This function responds to a request to create a new account on the application.
     *
     * @returns an HttpResponse with the body being the newly created user if successful, or an HTTP 409 (Conflict) HttpErrorResponse if unsuccessful. All user IDs in the
     *          application are assigned sequentially and cannot be mutated.
     */
    const createAccount$ = () : Observable<HttpEvent<unknown>> => {
      const ALL_USERS : User[] = JSON.parse(localStorage.getItem(ConfigService.appConfiguration.apiServer.paths.users.allUsers) ?? '[]') as User[];
      const REQUESTED_USER : User = REQUEST_BODY;

      // Check If The Username Already Exists On The Application
      if (ALL_USERS.find((user : User) : boolean => user.userName === REQUESTED_USER.userName)) {
        return constructErrorResponse$(HttpStatusCode.Conflict, `"${ REQUESTED_USER.userName }" is Already Taken.`);
      }

      // User ID Created Sequentially From 1st To Most Recent User (e.g., 1st User ID = 1, 2nd User ID = 2, etc.)
      REQUESTED_USER.id = ALL_USERS.length ? Math.max(...ALL_USERS.map((user : User) : number => user.id)) + 1 : 1;

      ALL_USERS.push(REQUESTED_USER);
      localStorage.setItem(ConfigService.appConfiguration.apiServer.paths.users.allUsers, JSON.stringify(ALL_USERS));

      return constructOkResponse$(REQUESTED_USER);
    };

    /**
     * This function returns a response to a particular HTTP request, or passes it along the Observable chain if the URL is not of interest.
     *
     * @returns An HttpEvent<unknown>-typed Observable stream appropriate for the intercepted request.
     */
    const handleURL$ = () : Observable<HttpEvent<unknown>> => {
      switch (true) {
        // GET Requests
        case (REQUEST_METHOD === HttpMethod.Get) && REQUEST_URL.endsWith(ConfigService.appConfiguration.apiServer.paths.contributors.allContributors) :
          return getAllContributors$();
        case (REQUEST_METHOD === HttpMethod.Get) && REQUEST_URL.endsWith(ConfigService.appConfiguration.apiServer.paths.users.allUsers) :
          return getAllUsers$();
        case (REQUEST_METHOD === HttpMethod.Get) && REQUEST_URL.endsWith(ConfigService.appConfiguration.apiServer.paths.users.currentUser) :
          return getCurrentUser$();

        // POST Requests
        case (REQUEST_METHOD === HttpMethod.Post) && REQUEST_URL.endsWith(ConfigService.appConfiguration.apiServer.paths.users.createAccount) :
          return createAccount$();
        default :
          return httpHandler.handle(httpRequest).pipe(catchError(this._handleError$));
      }
    };

    return of(null).pipe(
      catchError(this._handleError$),                                           // Passes Any Errors Down The Observable Chain
      mergeMap(handleURL$),                                                     // Executes Certain Instructions Before Relaying The Observable
      materialize(),                                                            // Ensures A Delay Even When An Error Is Thrown (See Remarks)
      delay(ConfigService.appConfiguration.constants.simulatedServerLatencyMS), // Simulates Server Latency
      dematerialize()                                                           // Necessary Due To The Call To materialize()
    );
  }

  /**
   * This method performs preliminary error handling steps for failed HTTP requests application-wide. The essence of this architecture is that of a catch-rethrow strategy.
   * This means that the caught error is rethrown and passed down the Observable chain. As such, this method can perform initial error handling logic and leaves it up to the
   * subscription down the line to further handle the error locally.
   *
   * @param errorResponse - An HttpErrorResponse object returned from an HttpRequest in case of HTTP failure, for whatever reason
   * @returns a never-typed Observable, meaning it never emits any value.
   */
  private readonly _handleError$ = (errorResponse : HttpErrorResponse) : Observable<never> => {
    return throwError(() : HttpErrorResponse => errorResponse);
  };
}

export {
  BackendInterceptor
};
