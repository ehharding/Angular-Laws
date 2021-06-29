import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AboutDialogData, OPEN_SOURCE_DEPENDENCIES, OpenSourceDependency, PACKAGE_VERSIONS, PackageVersion } from '@core/components/toolbar/about-dialog/about-dialog.model';
import { APP_CONSTANTS } from '@core/services/config/config.model';

import packageJSON from 'app/../../package.json';

@Component({
  changeDetection : ChangeDetectionStrategy.OnPush,
  encapsulation : ViewEncapsulation.None,
  selector : 'pf-about-dialog',
  styleUrls : ['about-dialog.component.scss'],
  templateUrl : 'about-dialog.component.html'
})
export class AboutDialogComponent implements OnInit, OnDestroy {
  public currentTime : Date = new Date();

  public readonly applicationTitle : string = this.dialogData.applicationTitle;
  public readonly dialogTitle : string = this.dialogData.aboutDialogTitle;

  public readonly applicationVersion : string = packageJSON.version;
  public readonly openSourceDependencies : OpenSourceDependency[] = OPEN_SOURCE_DEPENDENCIES;
  public readonly packageVersions : PackageVersion[] = PACKAGE_VERSIONS;

  private _currentTimeIntervalID : number;

  public constructor(@Inject(MAT_DIALOG_DATA) public dialogData : AboutDialogData, private readonly _changeDetectorRef : ChangeDetectorRef) { }

  public ngOnInit() : void {
    this._currentTimeIntervalID = this.setCurrentTimeInterval();
  }

  public ngOnDestroy() : void {
    window.clearInterval(this._currentTimeIntervalID);
  }

  /**
   * Returns a numeric non-zero number known as an interval ID that identifies a unique call to the global mixin WindowOrWorkerGlobalScope method
   * setInterval(). The interval ID can later be used to cancel the repeated execution of code contained within said call. Here, this call is use to
   * update the current system time displayed on the component.
   *
   * {@link https://nodejs.org/en/docs/guides/timers-in-node/ | Timers in Node.js}
   *
   * @returns a numeric non-zero number that identifies the timer created by the contained call to setInterval(), an interval ID.
   */
  public setCurrentTimeInterval() : number {
    // Update The Time Every Second
    return window.setInterval(() : void => {
      this.currentTime = new Date();

      this._changeDetectorRef.detectChanges();
    }, APP_CONSTANTS.timeConstants.oneSecondMS);
  }
}
