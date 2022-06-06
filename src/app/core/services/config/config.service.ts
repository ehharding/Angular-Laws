/**
 * This service handles the configuration of Firebase cloud services for the client application and the loading of external JSON configuration files containing configuration
 * data for said application. This setup routine should be invoked once, on startup, which is done in "app.module.ts".
 *
 * {@link https://console.firebase.google.com/project/clean-composite-352104/appcheck/apps | Pocket Fic Firebase App Check Configuration}
 * {@link https://www.google.com/recaptcha/admin/site/541191105 | Pocket Fic reCAPTCHA}
 */

import { Injectable } from '@angular/core';

import { Analytics, getAnalytics } from 'firebase/analytics';
import { AppCheck, ReCaptchaV3Provider, initializeAppCheck } from 'firebase/app-check';
import { DocumentSnapshot, Firestore, doc, getDoc, getFirestore } from 'firebase/firestore';
import { FirebaseApp, initializeApp } from 'firebase/app';

import { BehaviorSubject, Observable, distinctUntilChanged } from 'rxjs';

import { ENVIRONMENT } from '@environment/environment.development';

import { AppConfiguration, DEFAULT_FIRESTORE_CONNECTION_INFO } from '@core/services/config/config.model';

// This Is Needed For TypeScript... See https://firebase.google.com/docs/app-check/web/debug-provider#localhost
declare global {
  // eslint-disable-next-line no-inner-declarations, no-var, vars-on-top, @typescript-eslint/naming-convention
  var FIREBASE_APPCHECK_DEBUG_TOKEN : boolean | string | undefined;
}

@Injectable({ providedIn : 'root' })
class ConfigService {
  public static appConfiguration : AppConfiguration;
  public static firebaseAnalytics : Analytics | undefined = undefined;
  public static firebaseAppCheck : AppCheck | undefined = undefined;
  public static firestore : Firestore | undefined = undefined;

  private _firebaseApp : FirebaseApp | undefined = undefined;

  private readonly _firestoreConnected$ : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private readonly _firestorePersistenceKey$ : BehaviorSubject<string> = new BehaviorSubject<string>(DEFAULT_FIRESTORE_CONNECTION_INFO);
  private readonly _firestoreAppId$ : BehaviorSubject<string> = new BehaviorSubject<string>(DEFAULT_FIRESTORE_CONNECTION_INFO);
  private readonly _firestoreClientId$ : BehaviorSubject<string> = new BehaviorSubject<string>(DEFAULT_FIRESTORE_CONNECTION_INFO);

  private readonly _appConfigurationDocumentFirestorePath : string = 'configuration/appConfiguration';
  private readonly _reCAPTCHASiteKey : string = '6LfB60EgAAAAAL0uPo1nP0U9FYczf0e80ajcFXo3';

  /**
   * This function loads the global base application configuration data into the static class members. This should be called once on startup.
   *
   * @returns a Promise, or an object representing the eventual completion (or failure) of the asynchronous configuration retrieval.
   */
  public async loadApplicationConfiguration() : Promise<void> {
    /*
     * In the development environment, a Firebase-registered debug token is used for app verification in place of the production reCAPTCHA system. Each developer should
     * register the token that the debug console will print out to the debugger console when running in said environment. Use the link below to add the debug token generated
     * by Firebase to the Pocket Fic Firebase application. This will tell Firebase to allow application requests coming from a particular developer in a local environment.
     */
    if (ENVIRONMENT.name === 'development') {
      self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
    }

    // Configures The Client <=> Firebase Connection... Right Now The Development And Production Firebase Applications Are One And The Same
    this._firebaseApp = initializeApp(ENVIRONMENT.firebaseConfig);

    // Configures Firebase/Google Analytics
    ConfigService.firebaseAnalytics = getAnalytics(this._firebaseApp);

    // Configures The Firebase Cloud Firestore reCAPTCHA App Check Security System... This Is Ignored In Development Environments With A Debug Token Being Used Instead
    ConfigService.firebaseAppCheck = initializeAppCheck(this._firebaseApp, {
      isTokenAutoRefreshEnabled : true,
      provider : new ReCaptchaV3Provider(this._reCAPTCHASiteKey)
    });

    // Sets The Session Firestore Instance To Be Used Throughout The Application For Database Transactions
    ConfigService.firestore = getFirestore(this._firebaseApp);

    // Reaches Out To Firestore For On-The-Fly External Client Application Configuration Information
    await getDoc(doc(ConfigService.firestore, this._appConfigurationDocumentFirestorePath)).then((documentSnapshot : DocumentSnapshot) : void => {
      ConfigService.appConfiguration = documentSnapshot.data() as AppConfiguration;

      // If Firebase Firestore Is Truthy, We Are Said To Be "Connected"
      if (ConfigService.firestore) {
        this._firestoreConnected$.next(true);
        this._firestorePersistenceKey$.next(ConfigService.firestore['_firestoreClient'].databaseInfo.persistenceKey as string);
        this._firestoreAppId$.next(ConfigService.firestore['_firestoreClient'].databaseInfo.appId as string);
        this._firestoreClientId$.next(ConfigService.firestore['_firestoreClient'].clientId as string);
      // Otherwise, We Are Said To Be "Disconnected", So We Set That State For The Rest Of The Application
      } else {
        this._firestoreConnected$.next(false);
        this._firestorePersistenceKey$.next(DEFAULT_FIRESTORE_CONNECTION_INFO);
        this._firestoreAppId$.next(DEFAULT_FIRESTORE_CONNECTION_INFO);
        this._firestoreClientId$.next(DEFAULT_FIRESTORE_CONNECTION_INFO);
      }
    }).catch((error : Error) : void => {
      console.error(error.message);
    });
  }

  /**
   * Provides a boolean-typed Observable stream for interested subscribers to receive the Firestore connection status for the application session.
   *
   * @returns a boolean-typed observable stream. Subscribe to the stream to receive the object type specified asynchronously.
   */
  public getFirestoreConnected$() : Observable<boolean> {
    return this._firestoreConnected$.asObservable().pipe(distinctUntilChanged());
  }

  /**
   * Provides a string-typed Observable stream for interested subscribers to receive the Firestore Persistence Key for the application session.
   *
   * @returns a string-typed observable stream. Subscribe to the stream to receive the object type specified asynchronously.
   */
  public getFirestorePersistenceKey$() : Observable<string> {
    return this._firestorePersistenceKey$.asObservable().pipe(distinctUntilChanged());
  }

  /**
   * Provides a string-typed Observable stream for interested subscribers to receive the Firestore App ID for the application session.
   *
   * @returns a string-typed observable stream. Subscribe to the stream to receive the object type specified asynchronously.
   */
  public getFirestoreAppId$() : Observable<string> {
    return this._firestoreAppId$.asObservable().pipe(distinctUntilChanged());
  }

  /**
   * Provides a string-typed Observable stream for interested subscribers to receive the Firestore Client ID for the application session.
   *
   * @returns a string-typed observable stream. Subscribe to the stream to receive the object type specified asynchronously.
   */
  public getFirestoreClientId$() : Observable<string> {
    return this._firestoreClientId$.asObservable().pipe(distinctUntilChanged());
  }

  /**
   * Returns the reCAPTCHA site key for the Pocket Fic application.
   *
   * @returns the reCAPTCHA site key for the Pocket Fic application.
   */
  public getReCAPTCHASiteKey() : string {
    return this._reCAPTCHASiteKey;
  }
}

export {
  ConfigService
};
