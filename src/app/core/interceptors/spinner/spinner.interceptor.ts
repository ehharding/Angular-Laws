/******************************************************************************************************************************************************************************
 * The SpinnerInterceptor handles the subscription and unsubscription to the spinner overlay service, showing and hiding a progress spinner overlay as appropriate for HTTP
 * request instances.
 *
 * {@link https://angular.io/guide/http#intercepting-requests-and-responses | Angular Intercepting Requests And Responses Guide}
 *****************************************************************************************************************************************************************************/

import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, Subscriber, Subscription } from 'rxjs';

import { SpinnerService } from '@core/services/spinner/spinner.service';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  private readonly _activeRequests : HttpRequest<unknown>[] = [];

  public constructor(private readonly _spinnerService : SpinnerService) { }

  /**
   * This function is responsible for handling a subscription to the SpinnerService, which in turn displays a loading spinner when HTTP requests are made and pending, signaled
   * by the subscription (or lack thereof) to the service.
   *
   * {@link https://developer.mozilla.org/en-US/docs/Web/HTTP | MDN Web Docs HTTP Article}
   *
   * @param httpRequest - An outgoing HTTP request which is being intercepted
   * @param httpHandler - A handler that dispatches the HTTP httpRequest to the next handler in the chain, as determined by order in "app.module.ts"
   * @returns an Observable of the HTTP event stream to be passed on to the next interceptor via httpHandler.handle(httpRequest : HttpRequest<unknown>).
   */
  public intercept(httpRequest : HttpRequest<unknown>, httpHandler : HttpHandler) : Observable<HttpEvent<unknown>> {
    this._activeRequests.push(httpRequest);
    this._spinnerService.isLoading$.next(true);

    return new Observable<HttpEvent<unknown>>((observer : Subscriber<HttpEvent<unknown>>) : (() => void) => {
      const SPINNER_SUBSCRIPTION : Subscription = httpHandler.handle(httpRequest).subscribe({
        next : (httpEvent : HttpEvent<unknown>) : void => {
          if (httpEvent instanceof HttpResponse) {
            this._removeActiveRequest(httpRequest);
            observer.next(httpEvent);
          }
        },
        error : (errorResponse : HttpErrorResponse) : void => {
          this._removeActiveRequest(httpRequest);
          observer.error(errorResponse);
        },
        complete : () : void => {
          this._removeActiveRequest(httpRequest);
          SPINNER_SUBSCRIPTION.unsubscribe();
        }
      });

      return () : void => {
         this._removeActiveRequest(httpRequest);
         SPINNER_SUBSCRIPTION.unsubscribe();
      };
    });
  }

  /**
   * This function removes an HttpRequest from the active request list.
   *
   * @param httpRequest - The HttpRequest object to remove from the active request list
   */
  private _removeActiveRequest(httpRequest : HttpRequest<unknown>) : void {
    const REQUEST_INDEX : number = this._activeRequests.indexOf(httpRequest);

    if (this._activeRequests.length > 0) {
      this._activeRequests.splice(REQUEST_INDEX, 1);
    }

    this._spinnerService.isLoading$.next(this._activeRequests.length > 0);
  }
}
