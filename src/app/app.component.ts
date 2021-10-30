/******************************************************************************************************************************************************************************
 * This component serves as the core, or root, component. It is always present and forms the main application view.
 *
 * {@link https://angular.io/guide/architecture#components | Angular Component Guide}
 *****************************************************************************************************************************************************************************/

import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';

import { distinctUntilChanged } from 'rxjs';

import { SpinnerService } from '@core/services/spinner/spinner.service';

@Component({
  changeDetection : ChangeDetectionStrategy.OnPush,
  selector : 'pf-root',
  styleUrls : ['app.component.scss'],
  templateUrl : 'app.component.html'
})
export class AppComponent {
  public isLoading : boolean = false;

  public constructor(private readonly _changeDetectorRef : ChangeDetectorRef, private readonly _spinnerService : SpinnerService) {
    this._spinnerService.isLoading$.pipe(distinctUntilChanged()).subscribe({
      next : (isLoading : boolean) : void => {
        this.isLoading = isLoading;

        this._changeDetectorRef.markForCheck();
      }
    });
  }
}
