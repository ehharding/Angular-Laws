/******************************************************************************************************************************************************************************
 * This utility file holds several functions used in constructing HTTP responses to backend requests, mostly used in the BackendInterceptor to mock backend data responses.
 *****************************************************************************************************************************************************************************/

import { HttpErrorResponse, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';

import { APP_CONSTANTS } from '@core/services/config/config.model';

/**
 * This function provides a HttpResponse<unknown>-typed Observable stream for interested subscribers to receive an HTTP 200 (OK) response with a custom body.
 *
 * @param body - The body of the HttpResponse object
 * @returns a HttpResponse<unknown>-typed Observable stream. Subscribe to the stream to receive the object type specified asynchronously.
 */
export function constructOkResponse(body ?: any) : Observable<HttpResponse<unknown>> {
  return of(new HttpResponse({ status : HttpStatusCode.Ok, body }));
}

/**
 * This function provides a never-typed Observable stream for interested subscribers to trigger the emission of an HttpErrorResponse object as needed with a custom HTTP status
 * code and status text.
 *
 * @param httpStatusCode - An HTTP status code to include in the error response (e.g. 401, 404, etc.)
 * @param statusText - A status text, or message, to include in the error response (e.g. "A Very Specific Error Just Occurred...")
 * @returns a never-typed Observable stream. Subscribe to the stream to trigger the emission of an HttpErrorResponse object with the provided information.
 */
export function constructErrorResponse(httpStatusCode : HttpStatusCode, statusText : string) : Observable<never> {
  return throwError(() : HttpErrorResponse => new HttpErrorResponse({ status : httpStatusCode, statusText }));
}

/**
 * This function provides a never-typed Observable stream for interested subscribers to trigger the emission of an HTTP 401 (Unauthorized) HttpErrorResponse object as needed
 * with a custom HTTP status text.
 *
 * @param statusText - A status text, or message, to include in the error response (e.g. "The User Was Not Authorized For This Reason....")
 * @returns a never-typed Observable stream. Subscribe to the stream to trigger the emission of an HttpErrorResponse object with the provided information.
 */
export function constructUnauthorizedResponse(statusText : string = APP_CONSTANTS.httpResponseCodes[HttpStatusCode.Unauthorized].httpStatusText) : Observable<never> {
  return throwError(() : HttpErrorResponse => new HttpErrorResponse({ status : HttpStatusCode.Unauthorized, statusText }));
}
