import packageJSON from 'app/../../package.json';

export interface AboutDialogData {
  aboutDialogTitle : string;
  applicationTitle : string;
}

export interface OpenSourceDependency {
  imgAltDescription : string;
  imgTitle : 'angular' | 'angular-material' | 'bootstrap' | 'rxjs' | 'eslint' | 'typescript' | 'nodejs' | 'npm';
  tooltip : string;
  websiteLink : string;
}

export interface PackageVersion {
  name : string;
  version : string;
}

export const OPEN_SOURCE_DEPENDENCIES : OpenSourceDependency[] = [
  { imgAltDescription : 'Angular.io', imgTitle : 'angular', tooltip : 'Angular - Web Development Framework', websiteLink : 'https://angular.io' },
  { imgAltDescription : 'Angular Material.io', imgTitle : 'angular-material', tooltip : 'Angular Material - Theming Library', websiteLink : 'https://material.angular.io' },
  { imgAltDescription : 'Bootstrap', imgTitle : 'bootstrap', tooltip : 'Bootstrap - CSS Framework', websiteLink : 'https://getbootstrap.com' },
  { imgAltDescription : 'RxJS', imgTitle : 'rxjs', tooltip : 'RxJS - Reactive Extensions Library for JavaScript', websiteLink : 'https://rxjs-dev.firebaseapp.com' },
  { imgAltDescription : 'ESLint', imgTitle : 'eslint', tooltip : 'ESLint - JavaScript & TypeScript Linter', websiteLink : 'https://eslint.org' },
  { imgAltDescription : 'TypeScript', imgTitle : 'typescript', tooltip : 'TypeScript - JavaScript With Typing', websiteLink : 'https://www.typescriptlang.org' },
  { imgAltDescription : 'Node.js', imgTitle : 'nodejs', tooltip : 'Node.js - JavaScript Runtime Engine', websiteLink : 'https://nodejs.org/en/' },
  { imgAltDescription : 'NPM', imgTitle : 'npm', tooltip : 'NPM - Software Registry', websiteLink : 'https://www.npmjs.com' }
];

export const PACKAGE_VERSIONS : PackageVersion[] = [
  { name : 'Angular', version : packageJSON.dependencies['@angular/core'] },
  { name : 'Angular Material', version : packageJSON.dependencies['@angular/material'] },
  { name : 'Bootstrap', version : packageJSON.dependencies.bootstrap },
  { name : 'RxJS', version : packageJSON.dependencies.rxjs },
  { name : 'ESLint', version : packageJSON.devDependencies.eslint },
  { name : 'TypeScript', version : packageJSON.devDependencies.typescript }
];
