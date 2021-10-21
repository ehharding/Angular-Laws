/*****************************************************************************************************************************************************
 * This interceptor handles the subscription and unsubscription to the spinner overlay service, showing and hiding a progress spinner overlay as
 * appropriate for HTTP requests.
 *
 * {@link https://angular.io/guide/http#intercepting-requests-and-responses | Angular Intercepting Requests And Responses Guide}
 ****************************************************************************************************************************************************/

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, Subscription, finalize } from 'rxjs';

import { SpinnerOverlayService } from '@core/services/spinner-overlay/spinner-overlay.service';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  public constructor(private readonly _spinnerOverlayService : SpinnerOverlayService) { }

  /**
   * This method is responsible for intercepting application HTTP requests and is required to implement the HttpInterceptor interface. It performs a
   * certain action when intercepting an HTTP request. In this case, it handles the subscription to the spinner overlay service.
   *
   * @param httpRequest - An outgoing HTTP request which is being intercepted
   * @param httpHandler - A handler that dispatches the HTTP httpRequest to the next handler in the chain, as determined by order in `app.module.ts`
   * @returns an Observable of the HTTP event stream to be passed on to the next interceptor via httpHandler.handle(httpRequest : HttpRequest<any>).
   */
  public intercept(httpRequest : HttpRequest<unknown>, httpHandler : HttpHandler) : Observable<HttpEvent<unknown>> {
    const SPINNER_SUBSCRIPTION : Subscription = this._spinnerOverlayService.getSpinner().subscribe();

    return httpHandler.handle(httpRequest).pipe(finalize(() : void => { SPINNER_SUBSCRIPTION.unsubscribe(); }));
  }
}
