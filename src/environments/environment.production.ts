/******************************************************************************************************************************************************************************
 * This file defines the production environment configuration variables.
 *
 * {@link https://angular.io/guide/build | Angular Build Guide}
 *
 * @remarks This file can be replaced during build by using the "fileReplacements" array. "ng build --configuration production" replaces "environment.development.ts" with
 *          "environment.production.ts". The list of file replacements can be found in "angular.json".
 *****************************************************************************************************************************************************************************/

export interface ProductionEnvironment {
  name : string;
}

export const ENVIRONMENT : ProductionEnvironment = {
  name : 'production'
};
