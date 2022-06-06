// eslint-disable-next-line import/no-relative-parent-imports, node/file-extension-in-import, node/no-extraneous-import
import packageJSON from 'app/../../package.json';

interface OpenSourceDependency {
  imgAltDescription : string;
  imgTitle : string;
  tooltip : string;
  websiteLink : string;
}

interface PackageVersion {
  name : string;
  version : string;
}

const OPEN_SOURCE_DEPENDENCIES : OpenSourceDependency[] = [
  { imgAltDescription : 'Angular.io', imgTitle : 'angular', tooltip : 'Angular — Web Application Framework', websiteLink : 'https://angular.io' },
  { imgAltDescription : 'Angular Material.io', imgTitle : 'angular-material', tooltip : 'Angular Material — Theming Library', websiteLink : 'https://material.angular.io' },
  { imgAltDescription : 'Firebase', imgTitle : 'firebase', tooltip : 'Firebase — App Development Platform', websiteLink : 'https://firebase.google.com' },
  { imgAltDescription : 'Bootstrap', imgTitle : 'bootstrap', tooltip : 'Bootstrap — CSS Framework', websiteLink : 'https://getbootstrap.com' },
  { imgAltDescription : 'RxJS', imgTitle : 'rxjs', tooltip : 'RxJS — Reactive Programming Library', websiteLink : 'https://rxjs-dev.firebaseapp.com' },
  { imgAltDescription : 'TypeScript', imgTitle : 'typescript', tooltip : 'TypeScript — Better JavaScript', websiteLink : 'https://www.typescriptlang.org' },
  { imgAltDescription : 'ESLint', imgTitle : 'eslint', tooltip : 'ESLint — JavaScript/TypeScript Linter', websiteLink : 'https://eslint.org' },
  { imgAltDescription : 'Jasmine', imgTitle : 'jasmine', tooltip : 'Jasmine — Testing Framework', websiteLink : 'https://jasmine.github.io/' },
  { imgAltDescription : 'Karma', imgTitle : 'karma', tooltip : 'Karma — Test Runner', websiteLink : 'https://karma-runner.github.io/latest/index.html' },
  { imgAltDescription : 'Node.js', imgTitle : 'nodejs', tooltip : 'Node.js — JavaScript Runtime Engine', websiteLink : 'https://nodejs.org/en/' },
  { imgAltDescription : 'npm', imgTitle : 'npm', tooltip : 'npm — Software Registry', websiteLink : 'https://www.npmjs.com' }
];

const PACKAGE_VERSIONS : PackageVersion[] = [
  { name : 'Angular', version : packageJSON.dependencies['@angular/core'] },
  { name : 'Angular Material', version : packageJSON.dependencies['@angular/material'] },
  { name : 'Firebase', version : packageJSON.dependencies.firebase },
  { name : 'Bootstrap', version : packageJSON.dependencies.bootstrap },
  { name : 'RxJS', version : packageJSON.dependencies.rxjs },
  { name : 'TypeScript', version : packageJSON.devDependencies.typescript },
  { name : 'ESLint', version : packageJSON.devDependencies.eslint },
  { name : 'Jasmine', version : packageJSON.devDependencies['jasmine-core'] },
  { name : 'Karma', version : packageJSON.devDependencies.karma }
];

export {
  OPEN_SOURCE_DEPENDENCIES,
  PACKAGE_VERSIONS
};

export type {
  OpenSourceDependency,
  PackageVersion
};
