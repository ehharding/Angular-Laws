/******************************************************************************************************************************************************************************
 * The AuthInterceptor handles the authentication status of the user on every HTTP request made in the application, EXCEPT those needed for application startup, such as the
 * ConfigService.
 *
 * {@link https://angular.io/guide/http#intercepting-requests-and-responses | Angular Intercepting Requests And Responses Guide}
 *****************************************************************************************************************************************************************************/

import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, catchError, throwError } from 'rxjs';

import { HttpMethod } from '@core/services/config/config.model';
import { User } from '@core/services/user/user.model';

import { constructErrorResponse, constructOkResponse, constructUnauthorizedResponse } from '@shared/utilities/http-response.utility';

import { ConfigService } from '@core/services/config/config.service';
import { CredentialService } from '@core/services/credential/credential.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  public constructor(private readonly _credentialService : CredentialService) { }

  /**
   * This function is responsible for certain URL requests directed towards a backend and responds with mock data as appropriate.
   *
   * {@link https://developer.mozilla.org/en-US/docs/Web/HTTP | MDN Web Docs HTTP Article}
   *
   * @param httpRequest - An outgoing HTTP request which is being intercepted
   * @param httpHandler - A handler that dispatches the HTTP httpRequest to the next handler in the chain, as determined by order in `app.module.ts`
   * @returns an Observable of the HTTP event stream to be passed on to the next response-interceptor via httpHandler.handle(httpRequest : HttpRequest<unknown>).
   */
  public intercept(httpRequest : HttpRequest<unknown>, httpHandler : HttpHandler) : Observable<HttpEvent<unknown>> {
    const REQUEST_BODY : any = httpRequest.body;
    const REQUEST_METHOD : HttpMethod = httpRequest.method as HttpMethod;
    const REQUEST_URL : string = httpRequest.url;

    /**
     * This function deletes a user from the database by their ID. Essentially, any DELETE requests aimed at allUsers/someUserID are handled. The user must be logged in to the
     * application to delete a user and they can only delete their own profiles unless they are an admin.
     *
     * @returns an HttpResponse with the body being the user just deleted if successful or an HTTP 401 (Unauthorized) HttpErrorResponse if unsuccessful.
     */
    const deleteUser = () : Observable<HttpEvent<unknown>> => {
      let allUsers : User[] = JSON.parse(localStorage.getItem(ConfigService.appConfiguration.apiServer.paths.users.allUsers) ?? '[]');

      // Check That The User Is Logged In
      if (!this._credentialService.isLoggedIn()) {
        return constructUnauthorizedResponse('You Must Be Authenticated To Delete A User. Please Login.');
      }

      // Extract The User ID Associated With The Account To Be Deleted From The Request URL And Use It To Remove The Associated Object From The All Users List
      const USER_ID_TO_DELETE : number = parseInt(REQUEST_URL.split('/')[REQUEST_URL.split('/').length - 1], 10);
      const USER_TO_DELETE : User | undefined = allUsers.find((user : User) : boolean => user.id === USER_ID_TO_DELETE);

      // Check That The Logged-In User's ID Matches The ID They Want To Delete Or That They Are At Least An Admin To Actually Make The Update
      if ((this._credentialService.getCurrentUser().id === USER_ID_TO_DELETE) || this._credentialService.getCurrentUser().isAdmin) {
        allUsers = allUsers.filter((user : User) : boolean => user.id === USER_ID_TO_DELETE);
        localStorage.setItem(ConfigService.appConfiguration.apiServer.paths.users.allUsers, JSON.stringify(allUsers));

        return constructOkResponse(USER_TO_DELETE);
      }

      return constructUnauthorizedResponse('You Cannot Delete A User Other Than Yourself Unless You Are An Admin.');
    };

    /**
     * This function authenticates, or tries to login, a given user. It compares the username and password provided in the request against the users in the database. If there
     * is a match, an authentication token (presumably a Java Web Token (JWT)) is created, the CredentialService is updated with the newly logged-in user, complete with
     * the new token, and the user is returned in the response body. If there is not a match an HTTP 401 (Unauthorized) error response is instead returned, indicating a
     * failure to login.
     *
     * @returns an HttpResponse with the body being the user just authenticated if successful or an HTTP 401 (Unauthorized) HttpErrorResponse if unsuccessful. The returned
     *          user will have a randomly generated JWT token set, valid for the session.
     */
    const authenticate = () : Observable<HttpEvent<unknown>> => {
      const USERNAME : string = REQUEST_BODY.userName as string;
      const PASSWORD : string = REQUEST_BODY.password as string;

      const ALL_USERS : User[] = JSON.parse(localStorage.getItem(ConfigService.appConfiguration.apiServer.paths.users.allUsers) ?? '[]');
      const USER : User | undefined = ALL_USERS.find((user : User) : boolean => (user.userName === USERNAME) && (user.password === PASSWORD));

      if (USER) {
        USER.jwtToken = 'fake-jwt-token';
        this._credentialService.setCurrentUser(USER);

        return constructOkResponse(USER);
      }

      return constructErrorResponse(HttpStatusCode.Unauthorized, 'Username Or Password Is Incorrect.');
    };

    /**
     * This function returns a response to a particular HTTP request, or passes it along the Observable chain if the URL is not of interest.
     *
     * @returns An HttpEvent<unknown>-typed Observable stream appropriate for the intercepted request.
     */
    const handleURL = () : Observable<HttpEvent<unknown>> => {
      switch (true) {
        // DELETE Requests
        case (REQUEST_METHOD === HttpMethod.Delete) && REQUEST_URL.match(/\/allUsers\/\d+$/) :
          return deleteUser();

        // POST Requests
        case (REQUEST_METHOD === HttpMethod.Post) && REQUEST_URL.endsWith(ConfigService.appConfiguration.apiServer.paths.users.authenticate) :
          return authenticate();
        default :
          return httpHandler.handle(httpRequest).pipe(catchError(this._handleError));
      }
    };

    if (this._credentialService.isLoggedIn()) {
      httpRequest = httpRequest.clone({
        headers : httpRequest.headers.set('Authorization', `Bearer ${ this._credentialService.getJwtToken() }`)
      });
    }

    return handleURL();
  }

  /**
   * This method performs preliminary error handling steps for failed HTTP requests application-wide. The essence of this architecture is that of a catch-rethrow strategy.
   * This means that the caught error is rethrown and passed down the Observable chain. As such, this method can perform initial error handling logic and leaves it up to the
   * subscription down the line to further handle the error locally.
   *
   * @param errorResponse - An HttpErrorResponse object returned from an HttpRequest in the event of HTTP failure, for whatever reason
   * @returns a never-typed Observable, meaning it never emits any value.
   */
  private readonly _handleError = (errorResponse : HttpErrorResponse) : Observable<never> => {
    // Automatically Logout The Current User If An HTTP 401 (Unauthorized) Is Returned From The API
    if (errorResponse.status === HttpStatusCode.Unauthorized) {
      location.reload();
    }

    return throwError(() : HttpErrorResponse => errorResponse);
  };
}
