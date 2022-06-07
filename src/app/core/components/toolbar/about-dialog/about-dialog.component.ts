import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';

import { ReplaySubject, takeUntil } from 'rxjs';

import { ENVIRONMENT } from '@environment/environment.development';

import { APP_CONSTANTS, DEFAULT_FIRESTORE_CONNECTION_INFO } from '@core/services/config/config.model';
import { OPEN_SOURCE_DEPENDENCIES, OpenSourceDependency, PACKAGE_VERSIONS, PackageVersion } from '@core/components/toolbar/about-dialog/about-dialog.model';

import { ConfigService } from '@core/services/config/config.service';

// eslint-disable-next-line import/no-relative-parent-imports, node/file-extension-in-import, node/no-extraneous-import
import packageJSON from 'app/../../package.json';

@Component({
  selector : 'pf-about-dialog',
  changeDetection : ChangeDetectionStrategy.OnPush,
  encapsulation : ViewEncapsulation.None,
  styleUrls : ['about-dialog.component.scss'],
  templateUrl : 'about-dialog.component.html'
})
class AboutDialogComponent implements OnInit, OnDestroy {
  public currentTime : Date = new Date();

  public firestoreConnected : boolean = false;
  public firestorePersistenceKey : string = DEFAULT_FIRESTORE_CONNECTION_INFO;
  public firestoreAppId : string = DEFAULT_FIRESTORE_CONNECTION_INFO;
  public firestoreClientId : string = DEFAULT_FIRESTORE_CONNECTION_INFO;

  public readonly firebaseApiKey : string = ENVIRONMENT.firebaseConfig.apiKey;
  public readonly firebaseAuthDomain : string = ENVIRONMENT.firebaseConfig.authDomain;
  public readonly firebaseStorageBucket : string = ENVIRONMENT.firebaseConfig.storageBucket;
  public readonly firebaseAppId : string = ENVIRONMENT.firebaseConfig.appId;
  public readonly firebaseMessagingSenderId : string = ENVIRONMENT.firebaseConfig.messagingSenderId;
  public readonly firebaseMeasurementId : string = ENVIRONMENT.firebaseConfig.measurementId;
  public readonly firebaseProjectId : string = ENVIRONMENT.firebaseConfig.projectId;

  public readonly applicationVersion : string = packageJSON.version;
  public readonly reCAPTCHASiteKey : string = this._configService.getReCAPTCHASiteKey();

  public readonly openSourceDependencies : OpenSourceDependency[] = OPEN_SOURCE_DEPENDENCIES;
  public readonly packageVersions : PackageVersion[] = PACKAGE_VERSIONS;

  private _currentTimeIntervalId : number | undefined = undefined;

  private readonly _componentDestroyed$ : ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  public constructor(private readonly _changeDetectorRef : ChangeDetectorRef, private readonly _configService : ConfigService) { }

  public ngOnInit() : void {
    this._configService.getFirestoreConnected$().pipe(takeUntil(this._componentDestroyed$)).subscribe({
      next : (firestoreConnected : boolean) : void => {
        this.firestoreConnected = firestoreConnected;
        this._changeDetectorRef.detectChanges();
      }
    });

    this._configService.getFirestorePersistenceKey$().pipe(takeUntil(this._componentDestroyed$)).subscribe({
      next : (firestorePersistenceKey : string) : void => {
        this.firestorePersistenceKey = firestorePersistenceKey;
        this._changeDetectorRef.detectChanges();
      }
    });

    this._configService.getFirestoreAppId$().pipe(takeUntil(this._componentDestroyed$)).subscribe({
      next : (firestoreAppId : string) : void => {
        this.firestoreAppId = firestoreAppId;
        this._changeDetectorRef.detectChanges();
      }
    });

    this._configService.getFirestoreClientId$().pipe(takeUntil(this._componentDestroyed$)).subscribe({
      next : (firestoreClientId : string) : void => {
        this.firestoreClientId = firestoreClientId;
        this._changeDetectorRef.detectChanges();
      }
    });

    this._currentTimeIntervalId = this.setCurrentTimeInterval();
  }

  public ngOnDestroy() : void {
    this._componentDestroyed$.next(true);
    this._componentDestroyed$.complete();

    window.clearInterval(this._currentTimeIntervalId);
  }

  /**
   * Returns a numeric non-zero number known as an interval ID that identifies a unique call to the global mixin WindowOrWorkerGlobalScope method setInterval(). The interval
   * ID can later be used to cancel the repeated execution of code contained within said call. Here, this call is used to update the current system time displayed on the
   * component.
   *
   * {@link https://nodejs.org/en/docs/guides/timers-in-node/ | Timers in Node.js}
   *
   * @returns a numeric non-zero number that identifies the timer created by the contained call to setInterval(), an interval ID.
   */
  public setCurrentTimeInterval() : number {
    // Update The Time Every Second, Doing Any Other Tasks That Should Be Done Here Every Second As Well
    return window.setInterval(() : void => {
      this.currentTime = new Date();

      this._changeDetectorRef.detectChanges();
    }, APP_CONSTANTS.timeConstants.oneSecondMS);
  }
}

export {
  AboutDialogComponent
};
