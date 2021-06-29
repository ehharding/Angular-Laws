/*****************************************************************************************************************************************************
 * This interceptor transforms HTTP requests going in and out of the application, adding the proper headers, performing any authentication necessary,
 * and error handling. Intercepted requests should be passed on to the next interceptor, if any exist.
 *
 * {@link https://angular.io/guide/http#intercepting-requests-and-responses | Angular Intercepting Requests And Responses Guide}
 ****************************************************************************************************************************************************/

/* eslint-disable no-param-reassign, @typescript-eslint/no-explicit-any */

import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { ConfigService } from '@core/services/config/config.service';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  /**
   * This method is responsible for intercepting application HTTP requests and is required to implement the HttpInterceptor interface. It should be
   * noted that HttpRequest objects are immutable, meaning they cannot be modified. To "modify" such an object, you should re-assign to a cloned and
   * modified copy of the object, or use an appropriate method.
   *
   * @param httpRequest - An outgoing HTTP request which is being intercepted
   * @param httpHandler - A handler that dispatches the HTTP httpRequest to the next handler in the chain, as determined by order in `app.module.ts`
   * @returns an Observable of the HTTP event stream to be passed on to the next interceptor via httpHandler.handle(httpRequest : HttpRequest<any>).
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/HTTP
   */
  public intercept(httpRequest : HttpRequest<any>, httpHandler : HttpHandler) : Observable<HttpEvent<any>> {
    httpRequest = httpRequest.clone({ reportProgress : true, withCredentials : true, responseType : 'json' });

    if (!httpRequest.headers.has('Accept')) {
      httpRequest = httpRequest.clone({ headers : httpRequest.headers.set('Accept', 'application/json') });
    }
    if (!httpRequest.headers.has('Content-Type')) {
      httpRequest = httpRequest.clone({ headers : httpRequest.headers.set('Content-Type', 'application/json') });
    }

    return httpHandler.handle(httpRequest).pipe(catchError(this._handleError), retry(ConfigService.internalAppConfiguration.apiServer.retries));
  }

  /**
   * This method performs all necessary error handling steps. Eventually, this should do more sophisticated things like logging to remote
   * infrastructure or sending the information to a UI element.
   *
   * @param errorResponse - an HttpErrorResponse object returned from an HttpRequest in the event of HTTP failure, for whatever reason
   * @returns a never-typed Observable, meaning it cannot be subscribed to.
   */
  // eslint-disable-next-line @typescript-eslint/typedef
  private readonly _handleError = (errorResponse : HttpErrorResponse) : Observable<never> => {
    return throwError(() : Error => {
      return { name : errorResponse.status.toString(), message : errorResponse.statusText };
    });
  };
}
