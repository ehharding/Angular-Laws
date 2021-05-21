/*****************************************************************************************************************************************************
 * Copyright 2021 Evan H. Harding. All Rights Reserved.
 ****************************************************************************************************************************************************/

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AboutDialogConfigData, OpenSourceDependency, PackageVersion } from '@core/components/toolbar/about-dialog/about-dialog.model';

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

  public readonly applicationTitle : string = this.data.applicationTitle;
  public readonly dialogTitle : string = this.data.aboutDialogTitle;

  public readonly openSourceDependencies : OpenSourceDependency[] = [
    { imgAltDescription : 'Angular.io', imgTitle : 'angular', tooltip : 'Angular - Web Development Framework', websiteLink : 'https://angular.io' },
    { imgAltDescription : 'Angular Material.io', imgTitle : 'angular-material', tooltip : 'Angular Material - Theming Library', websiteLink : 'https://material.angular.io' },
    { imgAltDescription : 'Bootstrap', imgTitle : 'bootstrap', tooltip : 'Bootstrap - CSS Framework', websiteLink : 'https://getbootstrap.com' },
    { imgAltDescription : 'RxJS', imgTitle : 'rxjs', tooltip : 'RxJS - Reactive Extensions Library for JavaScript', websiteLink : 'https://rxjs-dev.firebaseapp.com' },
    { imgAltDescription : 'ESLint', imgTitle : 'eslint', tooltip : 'ESLint - JavaScript & TypeScript Linter', websiteLink : 'https://eslint.org' },
    { imgAltDescription : 'TypeScript', imgTitle : 'typescript', tooltip : 'TypeScript - JavaScript With Typing', websiteLink : 'https://www.typescriptlang.org' },
    { imgAltDescription : 'Node.js', imgTitle : 'nodejs', tooltip : 'Node.js - JavaScript Runtime Engine', websiteLink : 'https://nodejs.org/en/' },
    { imgAltDescription : 'NPM', imgTitle : 'npm', tooltip : 'NPM - Software Registry', websiteLink : 'https://www.npmjs.com' }
  ];

  public readonly applicationVersion : string = packageJSON.version;
  public readonly packageVersions : PackageVersion[] = [
    { name : 'Angular', version : packageJSON.dependencies['@angular/core'] },
    { name : 'Angular Material', version : packageJSON.dependencies['@angular/material'] },
    { name : 'Bootstrap', version : packageJSON.dependencies.bootstrap },
    { name : 'RxJS', version : packageJSON.dependencies.rxjs },
    { name : 'ESLint', version : packageJSON.devDependencies.eslint },
    { name : 'TypeScript', version : packageJSON.devDependencies.typescript }
  ];

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
