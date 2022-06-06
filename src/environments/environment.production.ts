/**
 * This file defines the production environment configuration variables.
 *
 * {@link https://angular.io/guide/build | Angular Build Guide}
 * {@link https://console.firebase.google.com/project/clean-composite-352104/overview | Pocket Fic Firebase}
 *
 * @remarks This file can be replaced during build by using the "fileReplacements" array. "ng build --configuration production" replaces "environment.development.ts" with
 *          "environment.production.ts". The list of file replacements can be found in "angular.json".
 */

interface ProductionEnvironment {
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

const ENVIRONMENT : ProductionEnvironment = {
  name : 'production',
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

export {
  ENVIRONMENT
};

export type {
  ProductionEnvironment
};
