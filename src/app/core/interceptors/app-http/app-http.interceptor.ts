/******************************************************************************************************************************************************************************
 * The AppHttpInterceptor transforms HTTP requests going in and out of the application, adding the proper headers, performing any necessary error handling.
 *
 * {@link https://angular.io/guide/http#intercepting-requests-and-responses | Angular Intercepting Requests And Responses Guide}
 *****************************************************************************************************************************************************************************/

import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  /**
   * This method is responsible for intercepting application HTTP requests and is required to implement the HttpInterceptor interface. It should be noted that HttpRequest
   * objects are immutable, meaning they cannot be modified. To "modify" such an object, you should re-assign to a cloned and modified copy of the object, or use an
   * appropriate method.
   *
   * {@link https://developer.mozilla.org/en-US/docs/Web/HTTP | MDN Web Docs HTTP Article}
   *
   * @param httpRequest - An outgoing HTTP request which is being intercepted
   * @param httpHandler - A handler that dispatches the HTTP httpRequest to the next handler in the chain, as determined by order in `app.module.ts`
   * @returns an Observable of the HTTP event stream to be passed on to the next response-interceptor via httpHandler.handle(httpRequest : HttpRequest<unknown>).
   */
  public intercept(httpRequest : HttpRequest<unknown>, httpHandler : HttpHandler) : Observable<HttpEvent<unknown>> {
    httpRequest = httpRequest.clone({ reportProgress : true, withCredentials : true, responseType : 'json' });

    if (!httpRequest.headers.has('Accept')) {
      httpRequest = httpRequest.clone({ headers : httpRequest.headers.set('Accept', 'application/json') });
    }

    if (!httpRequest.headers.has('Content-Type')) {
      httpRequest = httpRequest.clone({ headers : httpRequest.headers.set('Content-Type', 'application/json') });
    }

    return httpHandler.handle(httpRequest).pipe(catchError(this._handleError));
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
    return throwError(() : HttpErrorResponse => errorResponse);
  };
}
