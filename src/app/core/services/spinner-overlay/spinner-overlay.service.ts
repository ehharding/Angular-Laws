/*****************************************************************************************************************************************************
 * This service handles the showing or hiding of a progress spinner overlay. This is mostly used for asynchronous operations like HTTP requests.
 ****************************************************************************************************************************************************/

import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';

import { NEVER, Observable, defer, finalize, share } from 'rxjs';

import { SpinnerOverlayComponent } from '@core/components/spinner-overlay/spinner-overlay.component';

@Injectable({ providedIn : 'root' })
export class SpinnerOverlayService {
  private readonly _spinner$ : Observable<never> = defer(() : Observable<never> => {
    this._show();

    return NEVER.pipe(finalize(() : void => { this._hide(); }));
  });

  private _overlayRef : OverlayRef;

  public constructor(private readonly _overlay : Overlay) { }

  public getSpinner() : Observable<never> {
    return this._spinner$.pipe(share());
  }

  /**
   * Hides the spinner overlay instance.
   */
  private _hide() : void {
    this._overlayRef.detach();
  }

  /**
   * Shows the spinner overlay instance.
   */
  private _show() : void {
    Promise.resolve(null).then(() => { // eslint-disable-line @typescript-eslint/no-floating-promises
      this._overlayRef = this._overlay.create({
        hasBackdrop : false,
        positionStrategy : this._overlay.position().global().centerHorizontally().centerVertically()
      });

      this._overlayRef.attach(new ComponentPortal(SpinnerOverlayComponent));
    });
  }
}
