/*****************************************************************************************************************************************************
 * Copyright 2021 Evan H. Harding. All Rights Reserved.
 ****************************************************************************************************************************************************/

export interface AboutDialogConfigData {
  aboutDialogTitle : string;
  applicationTitle : string;
}

export interface OpenSourceDependency {
  imgAltDescription : string;
  imgTitle : 'angular' | 'angular-material' | 'bootstrap' | 'eslint' | 'nodejs' | 'npm' | 'rxjs' | 'typescript';
  tooltip : string;
  websiteLink : string;
}

export interface PackageVersion {
  name : string;
  version : string;
}
