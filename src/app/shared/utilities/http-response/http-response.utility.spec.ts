import { HttpErrorResponse, HttpResponse, HttpStatusCode } from '@angular/common/http';

import { constructErrorResponse$, constructOkResponse$, constructUnauthorizedResponse$ } from '@shared/utilities/http-response/http-response.utility';

describe('class HttpResponseUtility', () : void => {
  describe('function constructOkResponse$()', () : void => {
    it('should return an Observable OK HttpResponse (HTTP 200) stream with the emitted object having its body set to the provided parameter', () : void => {
      const MOCK_HTTP_BODY : any = [{ some : 'data' }];

      constructOkResponse$(MOCK_HTTP_BODY).subscribe({
        next(httpResponse : HttpResponse<unknown>) : void {
          expect(httpResponse.status).toBe(HttpStatusCode.Ok);
          expect(httpResponse.body).toEqual(MOCK_HTTP_BODY);
        }
      });
    });
  });

  describe('function constructErrorResponse$()', () : void => {
    it('should throw an Observable HttpErrorResponse object with the emitted object having its status and statusText set to the provided parameters', () : void => {
      const EXPECTED_ERROR_RESPONSE : HttpErrorResponse = { status : HttpStatusCode.Unauthorized, statusText : 'You Are Unauthorized' } as any;

      constructErrorResponse$(EXPECTED_ERROR_RESPONSE.status, EXPECTED_ERROR_RESPONSE.statusText).subscribe({
        error(errorResponse : HttpErrorResponse) : void {
          expect(errorResponse.status).toEqual(EXPECTED_ERROR_RESPONSE.status);
          expect(errorResponse.statusText).toEqual(EXPECTED_ERROR_RESPONSE.statusText);
        }
      });
    });
  });

  describe('function constructUnauthorizedResponse$', () : void => {
    it('should throw an Observable UNAUTHORIZED HttpErrorResponse (HTTP 401) stream with the emitted object having its statusText set to the provided parameter', () : void => {
      constructUnauthorizedResponse$().subscribe({
        error(errorResponse : HttpErrorResponse) : void {
          expect(errorResponse.status).toEqual(HttpStatusCode.Unauthorized);
        }
      });
    });

    it('should throw an Observable UNAUTHORIZED HttpErrorResponse (HTTP 401) stream with the emitted object having its statusText set to the default unauthorized text', () : void => {
      constructUnauthorizedResponse$().subscribe({
        error(errorResponse : HttpErrorResponse) : void {
          expect(errorResponse.status).toEqual(HttpStatusCode.Unauthorized);
        }
      });
    });
  });
});
