/*****************************************************************************************************************************************************
 * Copyright 2021 Evan H. Harding. All Rights Reserved.
 ****************************************************************************************************************************************************/

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import packageJSON from 'app/../../package.json';

export interface AboutDialogConfigData {
  aboutDialogTitle : string;
  applicationTitle : string;
}

@Component({
  changeDetection : ChangeDetectionStrategy.OnPush,
  selector : 'pf-about-dialog',
  styleUrls : ['about-dialog.component.scss'],
  templateUrl : 'about-dialog.component.html'
})
export class AboutDialogComponent implements OnInit, OnDestroy {
  public currentTime : Date = new Date();

  public readonly applicationTitle : string = this.data.applicationTitle;
  public readonly dialogTitle : string = this.data.aboutDialogTitle;

  public readonly applicationVersion : string = packageJSON.version;
  public readonly angularVersion : string = packageJSON.dependencies['@angular/core'];
  public readonly angularMaterialVersion : string = packageJSON.dependencies['@angular/material'];
  public readonly bootstrapVersion : string = packageJSON.dependencies['bootstrap'];      // eslint-disable-line @typescript-eslint/dot-notation
  public readonly rxJSVersion : string = packageJSON.dependencies['rxjs'];                // eslint-disable-line @typescript-eslint/dot-notation
  public readonly esLintVersion : string = packageJSON.devDependencies['eslint'];         // eslint-disable-line @typescript-eslint/dot-notation
  public readonly typeScriptVersion : string = packageJSON.devDependencies['typescript']; // eslint-disable-line @typescript-eslint/dot-notation

  private _currentTimeTimeout : number;

  public constructor(@Inject(MAT_DIALOG_DATA) public data : AboutDialogConfigData, private readonly _changeDetectorRef : ChangeDetectorRef) { }

  public ngOnInit() : void {
    this._currentTimeTimeout = this.setCurrentTimeInterval();
    this.currentTime.getFullYear().toString();
  }

  public ngOnDestroy() : void {
    window.clearInterval(this._currentTimeTimeout);
  }

  /**
   * Returns a NodeJS.Timeout object that performs a series of instructions at regular intervals.
   *
   * {@link https://nodejs.org/en/docs/guides/timers-in-node/ | Timers in Node.js}
   *
   * @returns a NodeJS.Timeout object.
   *
   * @remarks You should be cautious to call clearInterval() on a NodeJS.Timeout whose interval has been set so that the object does not keep the
   *          process alive unnecessarily longer than it has to.
   */
  public setCurrentTimeInterval() : number {
    // Update The Time Every Second
    return window.setInterval(() : void => {
      this.currentTime = new Date();

      this._changeDetectorRef.detectChanges();
    }, 1000); // eslint-disable-line @typescript-eslint/no-magic-numbers
  }
}
