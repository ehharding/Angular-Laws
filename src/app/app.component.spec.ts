import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SpinnerService } from '@core/services/spinner/spinner.service';

import { AppComponent } from 'app/app.component';

describe('AppComponent', () : void => {
  let appComponentFixture : ComponentFixture<AppComponent>;
  let appComponentElement : HTMLElement;
  let appComponentInstance : any;

  let spinnerService : SpinnerService;

  beforeEach(waitForAsync(() : void => {
    TestBed.configureTestingModule({
      declarations : [AppComponent],
      providers : [SpinnerService]
    }).compileComponents();
  }));

  beforeEach(() : void => {
    appComponentFixture = TestBed.createComponent(AppComponent);
    appComponentElement = appComponentFixture.debugElement.nativeElement;
    appComponentInstance = appComponentFixture.debugElement.componentInstance;

    spinnerService = TestBed.inject(SpinnerService);

    appComponentFixture.detectChanges();
  });

  it('should be created', () : void => {
    expect(appComponentFixture).toBeTruthy();

    expect(appComponentInstance.isLoading).toBe(false);
  });

  describe('Template Tests', () : void => {
    describe('Elements', () : void => {
      it('should be initialized', () : void => {
        expect(appComponentElement.querySelector('div')?.className).toEqual('pf-app');
        expect(appComponentElement.querySelector('pf-toolbar')?.className).toEqual('mat-elevation-z5 pf-toolbar');
        expect(appComponentElement.querySelector('main')).not.toBeNull();
        expect(appComponentElement.querySelector('router-outlet')).not.toBeNull();
        expect(appComponentElement.querySelector('pf-spinner-overlay')).toBeNull();
      });

      it('should show the spinner component when the spinner service notifies that the spinner should be shown and vice-versa', () : void => {
        spinnerService.isLoading$.next(true);
        appComponentFixture.detectChanges();

        expect(appComponentElement.querySelector('pf-spinner-overlay')).not.toBeNull();

        spinnerService.isLoading$.next(false);
        appComponentFixture.detectChanges();

        expect(appComponentElement.querySelector('pf-spinner-overlay')).toBeNull();
      });
    });
  });
});
