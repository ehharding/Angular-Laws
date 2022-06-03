import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SPINNER_OVERLAY_TEXT } from '@core/components/spinner-overlay/spinner-overlay.model';

import { SpinnerOverlayComponent } from '@core/components/spinner-overlay/spinner-overlay.component';

describe('component SpinnerOverlayComponent', () : void => {
  let spinnerOverlayComponentFixture : ComponentFixture<SpinnerOverlayComponent>;
  let spinnerOverlayElement : HTMLElement;

  beforeEach(waitForAsync(() : void => {
    TestBed.configureTestingModule({
      declarations : [SpinnerOverlayComponent]
    }).compileComponents(); // Compile Template And CSS

    spinnerOverlayComponentFixture = TestBed.createComponent(SpinnerOverlayComponent);
    spinnerOverlayElement = spinnerOverlayComponentFixture.debugElement.nativeElement;

    spinnerOverlayComponentFixture.detectChanges();
  }));

  describe('Constructor Tests', () : void => {
    it('should be created', () : void => {
      expect(spinnerOverlayComponentFixture).toBeTruthy();
    });
  });

  describe('Template Tests', () : void => {
    describe('Elements', () : void => {
      it('should be initialized', () : void => {
        expect(spinnerOverlayElement.querySelector('div')?.className).toEqual('pf-spinner');
        expect(spinnerOverlayElement.querySelector('mat-spinner')?.className).toEqual('mb-2');
        expect(spinnerOverlayElement.querySelector('div span')?.className).toEqual('fs-4');
        expect(spinnerOverlayElement.querySelector('div span strong')?.innerHTML).toEqual(SPINNER_OVERLAY_TEXT);
      });
    });
  });
});
