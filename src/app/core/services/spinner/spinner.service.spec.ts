import { TestBed } from '@angular/core/testing';

import { SpinnerService } from '@core/services/spinner/spinner.service';

describe('service SpinnerService', () : void => {
  let spinnerService : SpinnerService;

  beforeEach(() : void => {
    TestBed.configureTestingModule({
      providers : [SpinnerService]
    });

    spinnerService = TestBed.inject(SpinnerService);

    expect(spinnerService).toBeTruthy();

    expect(spinnerService.isLoading$.value).toBeFalse();
  });

  it('should update the spinner loading state properly', () : void => {
    spinnerService.isLoading$.next(true);
    expect(spinnerService.isLoading$.value).toBeTrue();
  });
});
