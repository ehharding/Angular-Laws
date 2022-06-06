/**
 * This file defines the development environment configuration variables.
 *
 * {@link https://angular.io/guide/build | Angular Build Guide}
 * {@link https://console.firebase.google.com/project/clean-composite-352104/overview | Pocket Fic Firebase}
 *
 * @remarks This file can be replaced during build by using the "fileReplacements" array. "ng build --configuration production" replaces "environment.development.ts" with
 *          "environment.production.ts". The list of file replacements can be found in "angular.json".
 */

interface DevelopmentEnvironment {
  name : string;
  firebaseConfig : {
    apiKey : string;
    authDomain : string;
    storageBucket : string;
    appId : string;
    messagingSenderId : string;
    measurementId : string;
    projectId : string;
  };
}

const ENVIRONMENT : DevelopmentEnvironment = {
  name : 'development',
  firebaseConfig : {
    apiKey : 'AIzaSyDEKdY9wkrZ2JYpWrCbRitsx-0yA7QE2qc',
    authDomain : 'clean-composite-352104.firebaseapp.com',
    storageBucket : 'clean-composite-352104.appspot.com',
    appId : '1:758042759486:web:da28bbb2d4e583caa41c6f',
    messagingSenderId : '758042759486',
    measurementId : 'G-6YHL6QLFH2',
    projectId : 'clean-composite-352104'
  }
};

/*
 * For easier debugging in development mode, you can import the following file to ignore zone related error stack frames such as "zone.run", "zoneDelegate.invokeTask".
 *
 * This import should be commented out in production mode because it will have a negative impact on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error'; // Included with Angular CLI.

export {
  ENVIRONMENT
};

export type {
  DevelopmentEnvironment
};
